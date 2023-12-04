const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.table(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const contactById = parsedContacts.find(
      (contact) => contact.id === contactId
    );
    console.log("contactById: ", contactById);

    return contactById === undefined ? null : contactById;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const removedContact = await getContactById(contactId);
    const newContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    const stringifyContacts = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsPath, stringifyContacts);
    return removedContact;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = { id: Math.random().toString(), name, email, phone };
    const newContacts = [...parsedContacts, newContact];
    const stringifyContacts = JSON.stringify(newContacts, null, 2);
    await fs.writeFile(contactsPath, stringifyContacts);
    console.log("newContact: ", newContact);

    return newContact;
  } catch (error) {
    console.log("error: ", error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
