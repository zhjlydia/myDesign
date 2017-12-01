import Icon from './components/icon';
import {
    Select,
    Option
} from './components/select';
import Tag from './components/tag';
import Tree from './components/tree';
const myDesign = {
    Icon,
    Tag,
    Select,
    iSelect: Select,
    Option: Option,
    iOption: Option,
    Tree
}

const install = function (Vue, opts = {}) {
    Object.keys(myDesign).forEach((key) => {
        Vue.component(key, myDesign[key]);
    });
};

export default Object.assign(myDesign, {
    install
});