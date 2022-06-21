const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  // GetFeedbacks: 'https://localhost:44381/api/Feedback/GetFeedbacks',
  // AddFeedback: 'https://localhost:44381/api/Feedback/AddFeedback',
  // DeleteFeedback: 'https://localhost:44381/api/Feedback/DeleteFeedback?ID=',
  GetFeedbacks: ParentConfiguration + "",
  AddFeedback: ParentConfiguration + "",
  DeleteFeedback: ParentConfiguration + "",
};
