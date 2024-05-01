
const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{1,50}$/;
    return nameRegex.test(name);
}