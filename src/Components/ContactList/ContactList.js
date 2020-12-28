import React from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import styles from "./ContactList.module.css"
import PropTypes from "prop-types";

const ContactList = ({contacts, onDelete}) => (
    <TransitionGroup component="ul" className={styles.item}>
    {contacts.map((item) => (
      <CSSTransition key={item.id}
                     timeout={250}
                     classNames={styles}>
        <li className={styles.list}>
          {item.name} : {item.number}
          <button className={styles.button} id={item.id} onClick={onDelete}>
            Delete
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default ContactList;