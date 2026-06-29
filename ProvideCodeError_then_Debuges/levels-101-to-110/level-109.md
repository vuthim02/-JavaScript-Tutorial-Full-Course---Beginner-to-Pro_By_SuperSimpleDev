# Debugging Challenges - Level 109
## Theme: Grade Calculator with Multiple Inputs

---

### Error 1: Average calculation wrong
**Description:** Should calculate average of three grades
```javascript
function calcAverage(g1, g2, g3) {
  return g1 + g2 + g3 / 3;
}
console.log(calcAverage(80, 90, 100));
```

### Error 2: Sum of array grades
**Description:** Should sum all grades in array
```javascript
function sumGrades(grades) {
  let sum = 0;
  for (let i = 0; i <= grades.length; i++) {
    sum += grades[i];
  }
  return sum;
}
console.log(sumGrades([80, 90, 100]));
```

### Error 3: Letter grade calculation
**Description:** Should return 'A' for score >= 90
```javascript
function getLetterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  if (score < 60) return "F";
}
console.log(getLetterGrade(95));
```

### Error 4: GPA calculation
**Description:** Should convert percentage to GPA (4.0 scale)
```javascript
function percentToGPA(percent) {
  if (percent >= 90) return 4.0;
  if (percent >= 80) return 3.0;
  if (percent >= 70) return 2.0;
  if (percent >= 60) return 1.0;
  return 0.0;
}
console.log(percentToGPA(85));
```

### Error 5: Weighted grade calculation
**Description:** Should calculate weighted average with different weights
```javascript
function calcWeighted(homework, midterm, final) {
  return homework * 0.2 + midterm * 0.3 + final * 0.5;
}
console.log(calcWeighted(90, 80, 85));
```

### Error 6: Pass/fail check
**Description:** Should return true if grade >= 60
```javascript
function isPassing(grade) {
  if (grade >= 60) return "true";
  return "false";
}
console.log(isPassing(75));
```

### Error 7: Array reduce for average
**Description:** Should use reduce to calculate average
```javascript
let grades = [80, 90, 100];
let avg = grades.reduce((sum, g) => sum + g) / grades.length;
console.log(avg);
```

### Error 8: Missing return in function
**Description:** Should return the letter grade
```javascript
function getGrade(score) {
  if (score >= 90) console.log("A");
  else if (score >= 80) console.log("B");
}
console.log(getGrade(85));
```

### Error 9: Variable name typo
**Description:** Should use correct variable for calculation
```javascript
let score1 = 85, score2 = 90, score3 = 78;
let average = (score1 + score2 + score) / 3;
console.log(average);
```

### Error 10: Const for grades array
**Description:** Should be able to modify grades
```javascript
const grades = [80, 90, 100];
grades.push(85);
console.log(grades);
```

### Error 11: Wrong comparison operator
**Description:** Should check if score >= 70 for 'C'
```javascript
function getGrade(score) {
  if (score = 70) return "C";
}
console.log(getGrade(85));
```

### Error 12: Undefined variable in calculation
**Description:** Should calculate total using defined variable
```javascript
let grades = [80, 90, 100];
let total = 0;
for (let g of grades) {
  total += g;
}
console.log(total / length);
```

### Error 13: Typo in property access
**Description:** Should access score from result object
```javascript
let result = {student: "John", score: 85};
console.log(result.Score);
```

### Error 14: Missing default in switch
**Description:** Should handle unknown grade in switch
```javascript
function getGradePoints(letter) {
  switch(letter) {
    case "A": return 4;
    case "B": return 3;
    case "C": return 2;
    case "D": return 1;
    case "F": return 0;
  }
}
console.log(getGradePoints("A"));
```

### Error 15: Switch falling through
**Description:** Should return only matching case value
```javascript
function getGrade(score) {
  switch(true) {
    case score >= 90: return "A";
    case score >= 80: return "B";
    case score >= 70: return "C";
    case score >= 60: return "D";
    default: return "F";
  }
}
console.log(getGrade(85));
```

### Error 16: Recursive function infinite
**Description:** Should calculate grade without recursion
```javascript
function getGrade(score) {
  return getGrade(score);
}
console.log(getGrade(85));
```

### Error 17: parseInt for grade input
**Description:** Should parse grade string as integer
```javascript
let input = "85.5";
console.log(parseInt(input));
```

### Error 18: parseFloat for grade
**Description:** Should parse decimal grade from string
```javascript
let input = "85.5";
console.log(parseFloat(input));
```

### Error 19: Number constructor for validation
**Description:** Should convert string to number
```javascript
let input = "85";
console.log(Number(input) + 5);
```

```

### Error 20: NaN from invalid grade
**Description:** Should handle invalid grade input gracefully
```javascript
function calcAverage(grades) {
  let sum = grades.reduce((s, g) => s + g, 0);
  return sum / grades.length;
}
console.log(calcAverage([80, "abc", 90]));
```

### Error 21: isNaN check wrong
**Description:** Should validate grade is a number
```javascript
function isValid(grade) {
  return grade !== NaN;
}
console.log(isValid("abc"));
```

### Error 22: toFixed on letter grade
**Description:** Should not call toFixed on string
```javascript
let grade = "A";
console.log(grade.toFixed(2));
```

### Error 23: toString on null grade
**Description:** Should handle null grade
```javascript
let grade = null;
console.log(grade.toString());
```

### Error 24: Template literal with math
**Description:** Should display grade average in template
```javascript
let avg = 85;
console.log(`Average: ${avg}%`);
```

### Error 25: String concatenation order
**Description:** Should display "Grade: B"
```javascript
let grade = "B";
console.log("Grade: " + grade);
```

### Error 26: Index for first grade in array
**Description:** Should access first grade
```javascript
let grades = [85, 90, 78];
console.log(grades[1]);
```

### Error 27: Array length for count
**Description:** Should get number of grades
```javascript
let grades = [85, 90, 78];
console.log(grades.count);
```

### Error 28: ForEach to print grades
**Description:** Should log each grade
```javascript
let grades = [85, 90, 78];
grades.forEach(g => {
  console.log(g);
});
```

### Error 29: Map to convert to letter
**Description:** Should convert each grade to letter
```javascript
let scores = [85, 92, 73];
let letters = scores.map(s => {
  if (s >= 90) return "A";
  if (s >= 80) return "B";
  return "C";
});
console.log(letters);
```

### Error 30: Filter for failing grades
**Description:** Should get all grades below 60
```javascript
let grades = [85, 45, 90, 55];
let failing = grades.filter(g => g < 60);
console.log(failing);
```

### Error 31: Find first passing grade
**Description:** Should find first grade >= 60
```javascript
let grades = [45, 55, 75, 85];
let first = grades.find(g => g >= 60);
console.log(first);
```

### Error 32: Every for all passing
**Description:** Should check if all grades are passing
```javascript
let grades = [85, 90, 78];
let allPass = grades.every(g => g >= 60);
console.log(allPass);
```

### Error 33: Some for any A grade
**Description:** Should check if any grade is A (>= 90)
```javascript
let grades = [85, 92, 78];
let hasA = grades.some(g => g >= 90);
console.log(hasA);
```

### Error 34: Sort grades descending
**Description:** Should sort grades from highest to lowest
```javascript
let grades = [85, 92, 73, 90];
grades.sort((a, b) => b - a);
console.log(grades);
```

### Error 35: Includes for grade value
**Description:** Should check if 85 is in grades
```javascript
let grades = [85, 90, 78];
console.log(grades.includes(85));
```

### Error 36: IndexOf for grade position
**Description:** Should find index of first 90
```javascript
let grades = [85, 90, 78, 90];
console.log(grades.indexOf(90));
```

### Error 37: LastIndexOf for last occurrence
**Description:** Should find last index of 90
```javascript
let grades = [85, 90, 78, 90];
console.log(grades.lastIndexOf(90));
```

### Error 38: Slice for top grades
**Description:** Should get top 3 grades after sorting
```javascript
let grades = [85, 92, 73, 90, 88];
let top3 = grades.sort((a, b) => b - a).slice(0, 3);
console.log(top3);
```

### Error 39: Splice to remove lowest grade
**Description:** Should remove the lowest grade
```javascript
let grades = [85, 92, 73, 90];
let sorted = [...grades].sort((a, b) => a - b);
console.log(sorted.shift());
console.log(grades);
```

### Error 40: Concat for combining grade arrays
**Description:** Should combine two grade arrays
```javascript
let g1 = [85, 90];
let g2 = [78, 92];
let all = g1.concat(g2);
console.log(all);
```

### Error 41: Reverse for chronological order
**Description:** Should reverse grade order
```javascript
let grades = [85, 90, 78];
console.log(grades.reverse());
```

### Error 42: Spread for copying grades
**Description:** Should copy grades array without reference
```javascript
let grades = [85, 90, 78];
let copy = [...grades];
copy.push(92);
console.log(grades.length);
```

### Error 43: Destructure first two grades
**Description:** Should destructure first and second grade
```javascript
let grades = [85, 90, 78];
let [first, second] = grades;
console.log(first, second);
```

### Error 44: Rest for remaining grades
**Description:** Should collect remaining grades after first
```javascript
let grades = [85, 90, 78, 92];
let [first, ...rest] = grades;
console.log(rest);
```

### Error 45: Default parameter for extra credit
**Description:** Should default extra credit to 0
```javascript
function addExtraCredit(grade, extraCredit) {
  return grade + extraCredit;
}
console.log(addExtraCredit(85));
```

### Error 46: Rest parameter for multiple grades
**Description:** Should accept variable number of grades
```javascript
function avgGrades(...grades) {
  let sum = grades.reduce((s, g) => s + g, 0);
  return sum / grades.length;
}
console.log(avgGrades(85, 90, 78, 92));
```

### Error 47: Shorthand property for grade object
**Description:** Should return grade object with shorthand
```javascript
function makeGrade(student, score) {
  return {student: student, score: score};
}
console.log(makeGrade("John", 85));
```

### Error 48: Method shorthand in gradebook
**Description:** Should define method using shorthand
```javascript
let gradebook = {
  grades: [],
  addGrade(grade) {
    this.grades.push(grade);
  }
};
gradebook.addGrade(85);
console.log(gradebook.grades);
```

### Error 49: Computed property for subject
**Description:** Should use dynamic subject key
```javascript
let subject = "math";
let grade = {[subject]: 85};
console.log(grade.math);
```

### Error 50: Optional chaining for nested
**Description:** Should safely access nested grade data
```javascript
let data = {student: {grades: {math: 85}}};
console.log(data.student?.grades?.math);
```

### Error 51: Nullish coalescing for missing grade
**Description:** Should use 0 for missing grade
```javascript
function getGrade(grades, subject) {
  return grades[subject] ?? 0;
}
console.log(getGrade({math: 85}, "science"));
```

### Error 52: Logical OR for default
**Description:** Should use default if grade is falsy
```javascript
let grade = 0;
let display = grade || "Incomplete";
console.log(display);
```

### Error 53: Logical AND for extra credit
**Description:** Should only add extra credit if grade exists
```javascript
let grade = 85;
let extra = grade && 5;
console.log(extra);
```

### Error 54: toExponential for grade
**Description:** Should not use scientific notation
```javascript
let grade = 85;
console.log(grade.toExponential(2));
```

### Error 55: toPrecision on grade
**Description:** Should use correct grade precision
```javascript
let grade = 85.678;
console.log(grade.toPrecision(2));
```

### Error 56: Math.round for grade
**Description:** Should round grade to nearest integer
```javascript
let grade = 85.6;
console.log(Math.round(grade));
```

### Error 57: Math.floor for grade truncation
**Description:** Should not truncate grade
```javascript
let grade = 85.9;
console.log(Math.floor(grade));
```

### Error 58: Math.ceil for grade bump
**Description:** Should not inflate grades
```javascript
let grade = 85.1;
console.log(Math.ceil(grade));
```

### Error 59: Math.min for lowest grade
**Description:** Should find lowest grade
```javascript
let grades = [85, 92, 73];
console.log(Math.min(grades));
```

### Error 60: Math.max for highest grade
**Description:** Should find highest grade
```javascript
let grades = [85, 92, 73];
console.log(Math.max(grades));
```

### Error 61: CharAt for grade letter
**Description:** Should get letter grade character
```javascript
let grade = "A";
console.log(grade.charAt(0));
```

### Error 62: ToUpperCase for grade
**Description:** Should convert letter to uppercase
```javascript
let grade = "b";
console.log(grade.toUpperCase());
```

### Error 63: ToLowerCase for comparison
**Description:** Should compare grades case-insensitively
```javascript
function isGradeA(letter) {
  return letter === "a";
}
console.log(isGradeA("A"));
```

### Error 64: Includes for grade check
**Description:** Should check if grade string contains "A"
```javascript
let grade = "A+";
console.log(grade.includes("A"));
```

### Error 65: StartsWith for grade prefix
**Description:** Should check if grade starts with "B"
```javascript
let grade = "B+";
console.log(grade.startsWith("B"));
```

### Error 66: EndsWith for grade suffix
**Description:** Should check if grade ends with "+"
```javascript
let grade = "A+";
console.log(grade.endsWith("+"));
```

### Error 67: Replace for grade adjustment
**Description:** Should replace "-" with "+" in grade
```javascript
let grade = "A-";
console.log(grade.replace("-", "+"));
```

### Error 68: Split for grade parsing
**Description:** Should split "A+" into letter and modifier
```javascript
let grade = "A+";
console.log(grade.split("+"));
```

### Error 69: PadStart for grade display
**Description:** Should right-align grades in report
```javascript
let grades = ["A", "B+", "C-"];
for (let g of grades) {
  console.log(g.padStart(3));
}
```

### Error 70: PadEnd for student names
**Description:** Should left-align student names
```javascript
console.log("John".padEnd(10) + "A");
```

---

### Issue 1: Off-by-one in grade boundaries
**Description:** Should include 90 as 'A', not 'B'
```javascript
function getGrade(score) {
  if (score > 90) return "A";
  if (score > 80) return "B";
  return "C";
}
console.log(getGrade(90));
```

### Issue 2: Extra credit applied incorrectly
**Description:** Should add extra credit points to total before division
```javascript
let grades = [80, 90, 85];
let extraCredit = 5;
let avg = (grades.reduce((s, g) => s + g, 0) / grades.length) + extraCredit;
console.log(avg);
```

### Issue 3: Dropping lowest grade
**Description:** Should drop lowest grade before averaging
```javascript
function avgDropLowest(grades) {
  let sum = grades.reduce((s, g) => s + g, 0);
  let min = Math.min(...grades);
  return (sum - min) / (grades.length - 1);
}
console.log(avgDropLowest([80, 90, 70, 85]));
```

### Issue 4: Rounding average differently
**Description:** Should round average consistently
```javascript
let grades = [85, 86, 87];
let avg = grades.reduce((s, g) => s + g, 0) / grades.length;
console.log(Math.round(avg));
```

### Issue 5: Weighted grade rounding
**Description:** Should round weighted grade to 2 decimals
```javascript
let weighted = 0.2 * 85 + 0.3 * 90 + 0.5 * 78;
console.log(weighted);
```

### Issue 6: Infinite loop in grade input
**Description:** Should limit number of grade inputs
```javascript
let grades = [];
let input = 85;
while (input) {
  grades.push(input);
  input--;
}
console.log(grades);
```

### Issue 7: Floating point in grade avg
**Description:** Should handle floating point in average
```javascript
let avg = (85 + 90 + 78) / 3;
console.log(avg);
```

### Issue 8: Grade boundary inclusivity
**Description:** Should correctly assign 'D' for score 60
```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score > 60) return "D";
  return "F";
}
console.log(getGrade(60));
```

### Issue 9: Wrong calculation for GPA
**Description:** Should not treat 95 and 100 differently for GPA
```javascript
let gpa = 4.0 * (95 / 100);
console.log(gpa);
```

### Issue 10: Missing grade validation
**Description:** Should reject grades above 100
```javascript
function validateGrade(grade) {
  return grade >= 0 && grade <= 100;
}
console.log(validateGrade(150));
```

### Issue 11: Plus/minus grading
**Description:** Should calculate A+, A, A- correctly
```javascript
function getGrade(score) {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  return "B";
}
console.log(getGrade(93));
```

### Issue 12: Cumulative GPA calculation
**Description:** Should calculate cumulative GPA from multiple semesters
```javascript
let semesters = [{credits: 15, gpa: 3.5}, {credits: 18, gpa: 3.2}];
let totalCredits = semesters.reduce((s, sem) => s + sem.credits, 0);
let weightedGPA = semesters.reduce((s, sem) => s + sem.gpa * sem.credits, 0) / totalCredits;
console.log(weightedGPA);
```

### Issue 13: Z-score calculation
**Description:** Should calculate z-score for a grade
```javascript
let grade = 85, mean = 78, stdDev = 6;
let z = (grade - mean) / stdDev;
console.log(z);
```

### Issue 14: Percentile rank
**Description:** Should calculate percentile rank of grade
```javascript
function percentile(grades, score) {
  let count = grades.filter(g => g < score).length;
  return (count / grades.length) * 100;
}
console.log(percentile([70, 80, 85, 90, 95], 85));
```

### Issue 15: Curve calculation
**Description:** Should apply curve adjustment to all grades
```javascript
function applyCurve(grades, adjustment) {
  return grades.map(g => Math.min(g + adjustment, 100));
}
console.log(applyCurve([75, 80, 85], 10));
```

### Issue 16: Grade weighting by assignment type
**Description:** Should weight homework, quizzes, exams differently
```javascript
function weightedGrade(hw, quiz, exam) {
  return hw * 0.2 + quiz * 0.3 + exam * 0.5;
}
console.log(weightedGrade(90, 80, 85));
```

### Issue 17: Dropping multiple lowest grades
**Description:** Should drop two lowest quiz grades
```javascript
function dropLowestTwo(grades) {
  let sorted = [...grades].sort((a, b) => a - b);
  return sorted.slice(2);
}
console.log(dropLowestTwo([70, 85, 90, 65, 95]));
```

### Issue 18: Extra credit impact on final grade
**Description:** Should add extra credit without exceeding 100
```javascript
let base = 85;
let extraCredit = 20;
let final = Math.min(base + extraCredit, 100);
console.log(final);
```

### Issue 19: Grade recovery after retake
**Description:** Should replace old grade with retake grade
```javascript
let original = 65;
let retake = 82;
let final = Math.max(original, retake);
console.log(final);
```

### Issue 20: Semester GPA from course grades
**Description:** Should calculate semester GPA from letter grades
```javascript
let grades = [{grade: "A", credits: 3}, {grade: "B", credits: 4}, {grade: "C", credits: 3}];
let points = {A: 4, B: 3, C: 2, D: 1, F: 0};
let totalPoints = grades.reduce((s, g) => s + points[g.grade] * g.credits, 0);
let totalCredits = grades.reduce((s, g) => s + g.credits, 0);
let gpa = totalPoints / totalCredits;
console.log(gpa);
```

### Issue 21: Pass/fail course GPA exclusion
**Description:** Should exclude pass/fail courses from GPA
```javascript
let courses = [{grade: "A", type: "regular"}, {grade: "P", type: "passFail"}];
let regular = courses.filter(c => c.type === "regular");
console.log(regular.length);
```

### Issue 22: Incomplete grade handling
**Description:** Should handle "I" (incomplete) grades
```javascript
let grades = ["A", "B", "I", "C"];
let valid = grades.filter(g => g !== "I");
console.log(valid);
```

### Issue 23: Transfer credit evaluation
**Description:** Should include transfer credits without GPA impact
```javascript
let localCredits = 60;
let transferCredits = 30;
let total = localCredits + transferCredits;
console.log(total);
```

### Issue 24: Grade point deficiency calculation
**Description:** Should calculate additional points needed for target GPA
```javascript
let currentGPA = 2.5;
let currentCredits = 60;
let targetGPA = 3.0;
let needed = (targetGPA * (currentCredits + 30) - currentGPA * currentCredits) / 30;
console.log(needed);
```

### Issue 25: Academic warning status
**Description:** Should detect when GPA falls below 2.0
```javascript
let gpa = 1.8;
if (gpa < 2.0) {
  console.log("Academic Warning");
}
```

### Issue 26: Graduation requirements check
**Description:** Should verify minimum credit requirement met
```javascript
let earned = 115;
let required = 120;
console.log(earned >= required ? "Eligible" : "Need " + (required - earned) + " more credits");
```

### Issue 27: Major GPA calculation
**Description:** Should calculate GPA for major courses only
```javascript
let courses = [
  {name: "CS101", grade: "A", credits: 3, major: true},
  {name: "ENG101", grade: "C", credits: 3, major: false},
  {name: "CS201", grade: "B", credits: 4, major: true}
];
let major = courses.filter(c => c.major);
console.log(major.length);
```

### Issue 28: Grade inflation adjustment
**Description:** Should adjust historical grades for inflation
```javascript
let oldGrade = 80;
let adjustment = 0.05;
let adjusted = oldGrade * (1 + adjustment);
console.log(adjusted);
```

### Issue 29: Rank-based grading curve
**Description:** Should assign grades based on class rank
```javascript
let scores = [95, 88, 85, 72, 68];
let sorted = [...scores].sort((a, b) => b - a);
let top20 = Math.ceil(scores.length * 0.2);
console.log(top20);
```

### Issue 30: Grade appeal recalculation
**Description:** Should recalculate grade when points are corrected
```javascript
let originalPoints = 850;
let totalPoints = 1000;
let correctedPoints = originalPoints + 10;
console.log((correctedPoints / totalPoints * 100).toFixed(1) + "%");
```
---

### Modify 1: Add plus/minus grading system
**Description:** Support A+, A, A- etc. based on score
```javascript
function getGrade(score) {
  return "A";
}
console.log(getGrade(93));
```

### Modify 2: Add GPA calculation per subject
**Description:** Calculate individual GPA for each subject
```javascript
function subjectGPA(subjects) {
  return {};
}
console.log(subjectGPA({math: 85, science: 92, english: 78}));
```

### Modify 3: Add credit hours weighting
**Description:** Calculate GPA weighted by credit hours
```javascript
function weightedGPA(courses) {
  return 0.0;
}
console.log(weightedGPA([{grade: "A", credits: 3}, {grade: "B", credits: 4}]));
```

### Modify 4: Add grade distribution chart
**Description:** Count how many of each letter grade
```javascript
function gradeDistribution(grades) {
  return {A: 0, B: 0, C: 0, D: 0, F: 0};
}
console.log(gradeDistribution([85, 92, 73, 60, 45]));
```

### Modify 5: Add pass/fail option
**Description:** Support pass/fail grading mode
```javascript
function passFail(score) {
  return "Pass";
}
console.log(passFail(55));
```

### Modify 6: Add grade exemption
**Description:** Allow exempting certain grades from calculation
```javascript
function calcWithExemption(grades, exemptIndex) {
  return 0;
}
console.log(calcWithExemption([80, 90, 70], 1));
```

### Modify 7: Add grade replacement
**Description:** Replace old grade with new grade for retake
```javascript
function replaceGrade(grades, oldGrade, newGrade) {
  return grades;
}
console.log(replaceGrade([80, 90, 70], 80, 95));
```

### Modify 8: Add final exam weighting
**Description:** Calculate if final exam can change letter grade
```javascript
function finalImpact(currentAvg, finalWorth, desiredGrade) {
  return {needed: 0, possible: false};
}
console.log(finalImpact(82, 0.2, "A"));
```

### Modify 9: Add extra credit tracking
**Description:** Track and apply extra credit separately
```javascript
function applyExtraCredit(baseGrade, extraCredit) {
  return baseGrade;
}
console.log(applyExtraCredit(85, 5));
```

### Modify 10: Add late penalty
**Description:** Deduct points for late submissions
```javascript
function applyLatePenalty(grade, daysLate) {
  return grade;
}
console.log(applyLatePenalty(90, 3));
```

### Modify 11: Add attendance tracking
**Description:** Adjust grade based on attendance percentage
```javascript
function attendanceAdjustment(grade, attendancePct) {
  return grade;
}
console.log(attendanceAdjustment(85, 95));
```

### Modify 12: Add participation score
**Description:** Include participation as grade component
```javascript
function totalGrade(exam, homework, participation) {
  return 0;
}
console.log(totalGrade(85, 90, 80));
```

### Modify 13: Add grade book export
**Description:** Export grade book as formatted text
```javascript
function exportGradebook(students) {
  return "";
}
console.log(exportGradebook([{name: "John", grade: "A"}]));
```

### Modify 14: Add class rank calculation
**Description:** Calculate student's rank in class
```javascript
function classRank(students, studentName) {
  return 0;
}
console.log(classRank([{name: "John", avg: 85}, {name: "Jane", avg: 92}], "John"));
```

### Modify 15: Add grade trend analysis
**Description:** Show if grade is improving or declining
```javascript
function gradeTrend(grades) {
  return "improving";
}
console.log(gradeTrend([70, 75, 80]));
```

### Modify 16: Add minimum grade requirement
**Description:** Enforce minimum grade for prerequisites
```javascript
function meetsPrerequisite(grade, requiredGrade) {
  return false;
}
console.log(meetsPrerequisite(75, 70));
```

### Modify 17: Add grade forgiveness policy
**Description:** Allow repeating course for grade replacement
```javascript
function gradeForgiveness(original, retake) {
  return retake;
}
console.log(gradeForgiveness(65, 85));
```

### Modify 18: Add honor roll calculation
**Description:** Determine if student makes honor roll
```javascript
function honorRoll(gpa) {
  return false;
}
console.log(honorRoll(3.5));
```

### Modify 19: Add dean's list qualification
**Description:** Check dean's list eligibility (GPA >= 3.5)
```javascript
function deansList(gpa) {
  return false;
}
console.log(deansList(3.6));
```

### Modify 20: Add scholarship eligibility
**Description:** Check minimum GPA for scholarship
```javascript
function scholarshipEligible(gpa, minGPA) {
  return false;
}
console.log(scholarshipEligible(3.2, 3.0));
```

### Modify 21: Add grade notification alerts
**Description:** Alert when grade drops below threshold
```javascript
function checkGradeAlert(grade, threshold) {
  return "";
}
console.log(checkGradeAlert(65, 70));
```

### Modify 22: Add grade prediction
**Description:** Predict final grade based on current performance
```javascript
function predictFinal(currentGrades, remainingAssignments) {
  return 0;
}
```

### Modify 23: Add what-if analysis
**Description:** Show what grade is needed on final for target
```javascript
function whatIfNeeded(current, finalWorth, target) {
  return 0;
}
console.log(whatIfNeeded(82, 0.2, 90));
```

### Modify 24: Add grade simulator
**Description:** Simulate different scoring scenarios
```javascript
function simulateScenario(grades, weights) {
  return 0;
}
```

### Modify 25: Add grade comparison tool
**Description:** Compare grades with class average
```javascript
function compareToClass(myGrade, classAvg) {
  return "above";
}
console.log(compareToClass(85, 78));
```

### Modify 26: Add grade distribution statistics
**Description:** Calculate mean, median, mode of grades
```javascript
function gradeStats(grades) {
  return {mean: 0, median: 0, mode: 0};
}
console.log(gradeStats([75, 80, 85, 85, 90]));
```

### Modify 27: Add standard deviation
**Description:** Calculate standard deviation of grades
```javascript
function stdDeviation(grades) {
  return 0;
}
console.log(stdDeviation([70, 80, 85, 90, 95]));
```

### Modify 28: Add grade curve modes
**Description:** Support different curving methods (linear, square root)
```javascript
function curveGrades(grades, method) {
  return grades;
}
console.log(curveGrades([70, 80, 90], "linear"));
```

### Modify 29: Add grading scale customization
**Description:** Allow custom A/B/C/D/F thresholds
```javascript
function customScale(score, scale) {
  return "A";
}
console.log(customScale(85, {A: 90, B: 80, C: 70, D: 60}));
```

### Modify 30: Add multi-semester GPA
**Description:** Calculate cumulative GPA across semesters
```javascript
function cumulativeGPA(semesters) {
  return 0.0;
}
console.log(cumulativeGPA([{credits: 15, gpa: 3.5}, {credits: 18, gpa: 3.2}]));
```

### Modify 31: Add grade import from CSV
**Description:** Import grades from CSV file data
```javascript
function importGrades(csvData) {
  return [];
}
console.log(importGrades("John,85\nJane,92"));
```

### Modify 32: Add grade export to CSV
**Description:** Export grades to CSV format
```javascript
function exportGrades(grades) {
  return "";
}
console.log(exportGrades([{name: "John", grade: 85}]));
```

### Modify 33: Add grade chart (bar/histogram)
**Description:** Generate ASCII bar chart of grade distribution
```javascript
function gradeChart(distribution) {
  return "";
}
console.log(gradeChart({A: 5, B: 8, C: 3}));
```

### Modify 34: Add grade prediction model
**Description:** Use linear regression to predict final grades
```javascript
function predictGrade(homeworkAvg, quizAvg, midterm) {
  return 0;
}
```

### Modify 35: Add grade normalization
**Description:** Normalize grades to standard distribution
```javascript
function normalizeGrades(grades) {
  return grades;
}
```

### Modify 36: Add rubric scoring
**Description:** Score assignments based on rubric criteria
```javascript
function rubricScore(criteria, scores) {
  return 0;
}
console.log(rubricScore([{name: "Content", weight: 0.4}, {name: "Grammar", weight: 0.2}], [85, 90]));
```

### Modify 37: Add peer review integration
**Description:** Average peer review scores into grade
```javascript
function peerReviewGrade(myScore, peerScores) {
  return 0;
}
console.log(peerReviewGrade(85, [80, 90, 88]));
```

### Modify 38: Add self-assessment
**Description:** Compare self-assessment with actual grade
```javascript
function selfAssessmentDiff(selfGrade, actualGrade) {
  return 0;
}
console.log(selfAssessmentDiff(90, 85));
```

### Modify 39: Add grade improvement plan
**Description:** Generate study recommendations based on weak areas
```javascript
function improvementPlan(grades) {
  return [];
}
console.log(improvementPlan({homework: 90, quizzes: 70, exams: 80}));
```

### Modify 40: Add grade contract
**Description:** Track progress on grade improvement contract
```javascript
function gradeContract(target, current, timeline) {
  return {onTrack: false};
}
```

### Modify 41: Add extra credit opportunities
**Description:** Track available and completed extra credit
```javascript
let extraCredit = [{assignment: "Essay", points: 5, completed: false}];
```

### Modify 42: Add late work log
**Description:** Track late submissions and penalties
```javascript
let lateWork = [{assignment: "Homework 3", daysLate: 2, penalty: 10}];
```

### Modify 43: Add grade appeal process
**Description:** Allow students to request grade review
```javascript
function gradeAppeal(grade, reason) {
  return {approved: false, newGrade: grade};
}
```

### Modify 44: Add academic integrity tracking
**Description:** Flag potential academic integrity issues
```javascript
function checkIntegrity(submission, similarity) {
  return "ok";
}
console.log(checkIntegrity("essay.docx", 0.15));
```

### Modify 45: Add grade audit trail
**Description:** Log all grade changes for audit
```javascript
let gradeLog = [];
function logGradeChange(student, oldGrade, newGrade, reason) {
  gradeLog.push({student, oldGrade, newGrade, reason});
}
```

### Modify 46: Add grade privacy controls
**Description:** Control who can view grades
```javascript
function setGradeVisibility(grade, visibleTo) {
  return grade;
}
```

### Modify 47: Add grade notifications
**Description:** Notify students when grades are posted
```javascript
function notifyGradePosted(student, course, grade) {
  return true;
}
```

### Modify 48: Add grade deadlines
**Description:** Set and track grading deadlines
```javascript
let deadlines = [{assignment: "Final", dueDate: "2024-12-15", graded: false}];
```

### Modify 49: Add grade caching
**Description:** Cache computed grades for performance
```javascript
let gradeCache = {};
function getCachedGrade(studentId) {
  return gradeCache[studentId];
}
```

### Modify 50: Add grade API
**Description:** Create RESTful API for grade operations
```javascript
let gradeAPI = {
  getGrades: function(studentId) { return []; },
  setGrade: function(studentId, grade) { return true; }
};
```
