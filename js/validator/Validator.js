class Validator {
  /**
   * Validates formdata
   * @param description {string} - description of todo
   * @param category {string} - category of the todo
   */
  validateInputFormData(description, category) {
    const validCategories = ["coding", "finance", "household"];

    //checks if someone removes required attribute, if the inputs were still provided
    if (!description || !category) {
      throw new Error("Enter a description and category");
    }

    //check if category names haven't been changed
    if (!validCategories.includes(category)) {
      throw new Error(`${category} is not a valid category.`);
    }

    //checks for special symbols in input text to avoid e.g. <script>Tags</script>
    if (description.match(/[^\w\*]/)) {
      throw new Error("Don't use special characters in description.");
    }
  }
}
