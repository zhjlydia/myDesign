import Icon from './components/icon';
import Tag from './components/tag';
const myDesign = {
    Icon,
    Tag
}

const install = function (Vue, opts = {}) {
    Object.keys(myDesign).forEach((key) => {
        Vue.component(key, myDesign[key]);
    });
};

export default Object.assign(myDesign, {
    install
});