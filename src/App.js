import React, {Component} from 'react';
import { CSSTransition } from "react-transition-group";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import styles from "./App.module.css"


export default class App extends Component {

    state = {
        contacts : [],
        filter: "",
        isExist: false,
        duplicateContact: ""
    }
    componentDidMount(){
      const savedContact = localStorage.getItem("contacts");
      if (savedContact !== null){
        this.setState({
          contacts: JSON.parse(savedContact)
        })
      }
    };
    componentDidUpdate(prevProps, prevState){
      if (prevState.contacts !== this.state.contacts){
        localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
      }
    };

    handleCloseErrorWindow = () => {
      this.setState({
        isExist: false
      })
    }

    addContact = (contact) => {
      const checkedName = contact.name;
      const availableNames = this.state.contacts.map((contact) =>
        contact.name.toLowerCase()
      );

      if (availableNames.includes(checkedName.toLowerCase())) {
        this.setState({ isExist: true, duplicateContact: checkedName });
        setTimeout(
          () => this.setState({ isExist: false, duplicateContact: "" }),
          5000
        );
      } else
        this.setState({
          contacts: [...this.state.contacts, contact],
          isExist: false,
          duplicateContact: "",
        });
    };

    handleSearch = (e) => {
        e.preventDefault()
        this.setState({filter: e.target.value})
    }
    contactsFilter = () => {
        const {contacts, filter} = this.state;
        return(
        filter ? contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase())) : contacts);
    }

    handleDelete = (e) => {
        const id = e.target.id;
        this.setState({
            contacts: this.state.contacts.filter((contact) => contact.id !== id)
        })
    }

    render() {
    const { isExist, duplicateContact } = this.state;
    const filteredName = this.contactsFilter();
    return (
    <div className={styles.wrapper}>
        <CSSTransition in={true}
                       appear={true}
                       timeout={500}
                       classNames={styles}
                       unmountOnExit>
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>
        <CSSTransition in={isExist}
                       timeout={250}
                       classNames={styles}
                       unmountOnExit>
          <div onClick={this.handleCloseErrorWindow} className={styles.error}>
            {duplicateContact} already exist!
          </div>
        </CSSTransition>
        <ContactForm onAddContact={this.addContact}/>
        <h1 className={styles.title}>Contact</h1>
        <div>
          <CSSTransition in={this.state.contacts.length > 1}
                         timeout={500}
                         classNames={styles}
                         unmountOnExit>
            <Filter onFilter={this.handleSearch}></Filter>
          </CSSTransition>
            <ContactList contacts={filteredName} onDelete={this.handleDelete}></ContactList>
        </div>
    </div>
    )
    }
}