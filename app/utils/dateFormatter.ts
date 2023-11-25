function dateFormatter(string: String) {
     const date = new Date(string as unknown as Date);
     return date.toLocaleDateString('en-GB');
}

export default dateFormatter;