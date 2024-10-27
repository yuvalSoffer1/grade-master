export const loginValidationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Entered value does not match email format",
    },
  },
  password: {
    required: "Password is required",
  },
};

export const registerValidationRules = {
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Entered value does not match email format",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must have at least 8 characters",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  },
};

export const addClassValidationRules = {
  className: {
    required: "Class Name is required",
  },
  groupId: {
    required: "Group ID is required",
    min: {
      value: 1,
      message: "Group ID must be at least 1",
    },
  },
};

export const addStudentGradeValidationRules = {
  studentId: {
    required: "Student ID is required",
  },
  gradeItemId: {
    required: "Grade Item ID is required",
  },
  score: {
    required: "Score is required",
    min: {
      value: 0,
      message: "Score must be at least 0",
    },
    max: {
      value: 100,
      message: "Score must be at most 100",
    },
  },
};

export const addStudentValidationRules = {
  studentId: {
    required: "Student ID is required",
    pattern: {
      value: /^[0-9]{6}$/,
      message: "Student ID must be a numeric string of 6 digits",
    },
  },
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  prefixPhoneNumber: {
    pattern: {
      value: /^0\d{1,2}$/,
      message:
        "Prefix must be numeric, start with 0, and be 2 to 3 digits long",
    },
  },
  phoneNumber: {
    pattern: {
      value: /^\d{7}$/,
      message: "Phone number must be exactly 7 digits",
    },
  },
};

export const addGradeItemValidationRules = {
  name: {
    required: "Name is required",
  },
  weight: {
    required: "Weight is required",
    min: {
      value: 1,
      message: "Weight must be at least 1",
    },
    max: {
      value: 100,
      message: "Weight must be at most 100",
    },
  },
};
