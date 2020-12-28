import React, {Component} from 'react';
import styles from "./ContactForm.module.css"
import InputMask from "react-input-mask";
import { v4 as uuid_v4 } from 'uuid';

export default class ContactForm extends Component {

    state = {
        id: "",
        name: "",
        number: ""
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.onAddContact({
            id: uuid_v4(),
            name: this.state.name,
            number: this.state.number
        })
        this.setState({
            name: "",
            number: ""
        })
    }

    render(){
        const {name, number} = this.state;
    return (
    <form onSubmit={this.handleSubmit}>
        <label>
            <div className={styles.wrapper}>
                <h3 className={styles.title_item}>Name</h3>
                <input
                className={styles.input}
                type="text"
                autoComplete="off"
                value={name}
                name="name"
                onChange={this.handleChange}/>
            </div>
        </label>
        <label>
            <div className={styles.wrapper}>
                <h3 className={styles.title_item}>Number</h3>
                <InputMask mask="999-99-99"
                className={styles.input}
                type="tel"
                autoComplete="off"
                onChange={this.handleChange}
                value={number}
                name="number"
                placeholder="000-00-00"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"/>
            </div>
        </label>
        <div className={styles.button_wrapper}>
            <button className={styles.button} type="submit"
            disabled={name === "" || number === "" ? true : false}>Add contact</button>
        </div>
    </form>
    )
    }
}