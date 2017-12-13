import clone from 'common/js/clone';
import template from './_shoppingCart.html.tpl';
import layerTemplate from './layerTemplate.html';

function findStandInfoIndex(standardInfo, commodityItem) {
    const { goods } = commodityItem;
    let index = -1;

    goods.forEach((i, index2) => {
        if (JSON.stringify(i.standardInfo) === JSON.stringify(standardInfo)) {
            index = index2;
        }
    });

    return index;
}

class shoppingCart {
    constructor(store = {}) {
        this.store = store;
        this.commodityList = [];
        this.$layer = $(layerTemplate);
    }

    add(item) {
        const index = this.commodityList.map(i => i.goodsId).indexOf(item.goodsId);
        const commodityItem = this.commodityList[index];
        const shopItem = clone(item);

        shopItem.number = 1;

        if (index > -1) { // 购物车存在添加的商品
            if (shopItem.standardType === 1) {
                if (shopItem.type === 1) {
                    const speciesIndex = commodityItem.goods.map(i => i.standardName).indexOf(shopItem.standardName);
                    const standardInfo = shopItem.packageJson.standardInfo.find(i => i.name === shopItem.standardName);
                    const { price, memberPrice } = standardInfo;
                    if (speciesIndex < 0) {
                        commodityItem.goods.push({
                            standardName: shopItem.standardName,
                            num: 1,
                            price,
                            memberPrice
                        });
                    } else {
                        commodityItem.goods[speciesIndex].num += 1;
                    }
                } else {
                    const speciesIndex = findStandInfoIndex(shopItem.standardInfo, commodityItem);
                    if (speciesIndex < 0) {
                        commodityItem.goods.push({
                            standardInfo: shopItem.standardInfo,
                            num: 1
                        });
                    } else {
                        commodityItem.goods[speciesIndex].num += 1;
                    }
                }
            }

            commodityItem.number += 1; // number 为商品的总数量
            commodityItem.isRecommended = shopItem.isRecommended;
        } else {
            this.commodityList.push(shopItem);
        }
        this.render();
    }

    remove(item) {
        const index = this.commodityList.map(i => i.goodsId).indexOf(item.goodsId);
        const commodityItem = this.commodityList[index];
        const shopItem = clone(item);

        if (commodityItem.number > 1) {
            if (shopItem.standardType === 1) {
                if (shopItem.type === 1) {
                    const speciesIndex = commodityItem.goods.map(i => i.standardName).indexOf(shopItem.standardName);
                    const species = commodityItem.goods[speciesIndex];

                    if (species.num > 1) {
                        species.num -= 1;
                    } else {
                        commodityItem.goods = commodityItem.goods.filter(i => i.standardName !== species.standardName);
                    }
                } else {
                    const speciesIndex = findStandInfoIndex(shopItem.standardInfo, commodityItem);
                    const species = commodityItem.goods[speciesIndex];

                    if (species.num > 1) {
                        species.num -= 1;
                    } else {
                        commodityItem.goods = commodityItem.goods
                            .filter(i => JSON.stringify(i.standardInfo)
                                !== JSON.stringify(shopItem.standardInfo));
                    }
                }
            }

            this.commodityList[index].number -= 1;
        } else {
            this.commodityList = this.commodityList.filter(i => i.goodsId !== commodityItem.goodsId);
        }
        this.render();
    }

    clearAll() {
        this.commodityList = [];
    }

    priceAll() {
        return {
            memberPrice: this.getMemberPriceAll(),
            noMemberPrice: this.getNoMemberPriceAll()
        };
    }

    getMemberPriceAll() {
        let memberPrice = this.commodityList
        .filter(i => i.type === 2 || i.standardType === 0)
        .map(i => (i.memberPrice ? i.memberPrice : i.price) * i.number)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        memberPrice += this.commodityList
        .filter(i => i.type === 1 && i.standardType === 1)
        .map((i) => {
            const price = i.goods.map(g => (g.memberPrice ? g.memberPrice : g.price) * g.num)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return price;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return memberPrice / 100;
    }

    getNoMemberPriceAll() {
        let noMemberPrice = this.commodityList
        .filter(i => i.type === 2 || i.standardType === 0)
        .map(i => (i.price) * i.number)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        noMemberPrice += this.commodityList
        .filter(i => i.type === 1 && i.standardType === 1)
        .map((i) => {
            const price = i.goods.map(g => g.price * g.num)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            return price;
        })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return noMemberPrice / 100;
    }

    numberAll() {
        const number = this.commodityList
            .map(i => i.number)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return number;
    }

    getNumber(goodsId) {
        const shopItem = this.commodityList.find(i => i.goodsId === goodsId);

        if (!shopItem) return 0;

        return shopItem.number;
    }

    getStandardInfoIndex(item) {
        const index = this.commodityList.map(i => i.goodsId).indexOf(item.goodsId);
        const commodityItem = this.commodityList[index];
        return findStandInfoIndex(item.standardInfo, commodityItem);
    }

    render() {
        const { activity, paUserInfo, memberInfo } = this.store;
        if (this.commodityList.length <= 0) return;
        this.renderLayer(template.render({
            commodityList: this.commodityList,
            activity,
            paUserInfo,
            memberInfo
        }), false);
        this.handleActiveTips();
    }

    renderLayer(children, isShow) {
        if (isShow) {
            this.show();
        }

        this.update(children);

        $(document.body).append(this.$layer);

        this.initLayer();
    }

    initLayer() {
        this.$layer.on('click', (e) => {
            if (e.currentTarget === e.target) {
                this.hide();
            }
        });
    }

    update(children) {
        this.$layer.children('div').empty().append(children);
    }

    hide() {
        this.$layer.addClass('hide');
        $('.payBar > .activity-tips').removeClass('hide');
        $('.cart-icon').removeClass('active');
    }

    show() {
        this.$layer.removeClass('hide');
        $('.payBar > .activity-tips').addClass('hide');
        $('.cart-icon').addClass('active');
    }

    getGoods() {
        let goods = this.commodityList
        .filter(i => i.standardType === 0)
        .map(item => ({
            goodsId: item.goodsId,
            num: item.number,
            isRecommended: item.isRecommended,
            standardType: item.standardType,
            type: item.type
        }));

        this.commodityList
            .filter(i => i.standardType === 1)
            .forEach((i) => {
                const {
                    type,
                    goodsId,
                    standardType
                } = i;

                let list = [];
                if (type === 2) {
                    list = i.goods.map(i2 => ({
                        goodsId,
                        type,
                        standardType,
                        num: i2.num,
                        standardInfo: i2.standardInfo
                    }));
                } else {
                    list = i.goods.map(i2 => ({
                        goodsId,
                        type,
                        standardType,
                        num: i2.num,
                        standardName: i2.standardName
                    }));
                }
                goods = goods.concat(list);
            });
        return goods;
    }

    handleActiveTips() {
        const $activityTarget = $('.activity-tips');
        const { activity } = this.store;
        if (!$activityTarget || !activity) return;
        const type = activity.type; // 活动类型
        const conditionPrice = activity.ruleJson.condition / 100; // 活动限制金额

        const diffPrice = conditionPrice - this.priceAll().noMemberPrice; // 达到活动限制差额,不管是不是会员都按原价

        const isFit = diffPrice <= 0;
        let html = '';
        if (type === 1) {
            if (!isFit) {
                html = `再买<em>${diffPrice.toFixed(2)}</em>元可减${(activity.ruleJson.value / 100).toFixed(2)}元`;
            } else {
                html = `已满<em>${(activity.ruleJson.condition / 100).toFixed(2)}
                </em>元,可减${(activity.ruleJson.value / 100).toFixed(2)}元`;
            }
        } else if (type === 2) {
            if (!isFit) {
                html = `再买<em>${diffPrice.toFixed(2)}</em>元可获赠${activity.ruleJson.discount}`;
            } else {
                html = `已满<em>${(activity.ruleJson.condition / 100).toFixed(2)}</em>元,可获赠${activity.ruleJson.discount}`;
            }
        }
        $activityTarget.html(html);
    }
}


export default shoppingCart;
