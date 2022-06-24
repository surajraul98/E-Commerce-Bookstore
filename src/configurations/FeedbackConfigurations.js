const ParentConfiguration = require("./ParentConfiguration");

module.exports = {
  // GetFeedbacks: 'https://localhost:44381/api/Feedback/GetFeedbacks',
  // AddFeedback: 'https://localhost:44381/api/Feedback/AddFeedback',
  // DeleteFeedback: 'https://localhost:44381/api/Feedback/DeleteFeedback?ID=',
  GetFeedbacks: ParentConfiguration.Parent + "api/Feedback/GetFeedbacks",
  AddFeedback: ParentConfiguration.Parent + "api/Feedback/AddFeedback",
  DeleteFeedback: ParentConfiguration.Parent + "api/Feedback/DeleteFeedback?ID=",
};
