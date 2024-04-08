# Code Capsule Dashboard

## To start up the demo

Run `npm install` and then `npm start`

## Explanations

### Task 1

To generate fixtures, a random approach has been chosen due to time constraints and a lack of knowledge in this specific domain. Thus, the fixtures have been created following the data structure presented in the assignment annex. A limitation was set on the data fixtures: all the actions happen in the span of the same three days. This seems like a reasonable limitation since the student tasks are usually limited in time (for submission, evaluation, etc.).

The fixture list can be found in the `action-list.json` file and was generated using the `generateStudentActions(200, 50)` function. This means that we have 200 students performing 50 actions each.

The code for the fixture generation can be found in the `Task1` folder and specifically in the `student-action-generator.ts` file. Possible improvements for this task could be uneven distribution of the action types, i.e. the students will probably generate more action of type `SAVE` rather than of type `GENERATE_FIGURE`. The students should also be identified ideally by a unique UUID instead of a simple integer.

### Task 2

Three charts have been created for this task:

#### Most used actions chart

The first chart consists of a simple count of how much each action has been used in total. This gives us a brief overview of the general action usage and allows catching unexpected discrepancies early. For example, if too many `CLEAR` actions have been performed compared to other exercises, we can speculate that students had difficulty understanding the tasks set before them.

The screenshot of the graph can be found in the `mostUsedActionsChart.png` file in the `images` folder and the function representing this chart in the code is `MostUsedActions`.

#### Actions used through time

This chart tries to present the actions executed through time by the students. The point of this chart is to represent the “journey” of the students through their actions. For example, if we see that a sharp increase in `GENERATE_FIGURE` actions, we can correlate it to a task that demands figure creation. Or to speculate further, a sharp increase in `RUN` without `SAVE` can indicate increased code testing due to a difficult task. This chart may not be useful on its own, but it can be used in conjunction with other graphs to tell a more interesting story.

An interaction that allows the user to select which type of action to display/hide was planned, but was not implemented due to time constraints.

The screenshot of the graph can be found in the `actionsUsedThroughTime.png` file in the `images` folder and the function representing this chart in the code is `ActionsUsedThroughTime`.

#### Action type used by each student

This chart shows how much of an action has been performed by each student, presented in an increasing order. The user has the option to select the action type and the chart is updated in real-time. This chart can be useful in identifying students who have difficulty with the current tasks. If a particular student uses the `CLEAR` action much more than the average, we can speculate that they are having difficulty with the assignment or that they had numerous false starts due to misunderstanding of the task at hand.

The screenshot of the graph can be found in the `actionsByStudents.png` file in the `images` folder and the function representing this chart in the code is `ActionsUsedByStudents`.

### Task 3

Task 3 could not be accomplished due to time constraints, but several ideas could be implemented. One such idea is to have the `RUN` action also register if the code compilation has been successful or not. This could lead to interesting statistics on the ratio of code runs to successful code compilations. Perhaps this ratio could be used to evaluate the overall progression of the student?