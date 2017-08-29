import { observable, action } from 'mobx';

class Field {
    @observable value = null;
    @observable error = null;
    @observable hidden = false;
    placeholder = null;
    name = null;
    type = null;

    constructor(field) {
        this.name = field.name || '';
        this.value = field.value;
        this.placeholder = field.placeholder;
        this.type = field.type || 'text';
    }

    @action toggleHiden(val) {
        this.hidden = val;
    }

    @action setValue(val) {
        this.value = val;
    }

    @action validate() {
        this.error = this.value.trim() === '';
    }
}

export default Field;