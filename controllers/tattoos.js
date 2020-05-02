module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */

   const getAddTattooForm = (req, res)=> {
     res.render(`tattoos/add-tattoo`);
   }
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    getAddTattooForm: getAddTattooForm
  };
};
