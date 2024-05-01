
const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z ]{1,50}$/;
    return nameRegex.test(name);
}

export default isValidName;