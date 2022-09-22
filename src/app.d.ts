interface User {
  _id: string;
  email: string;
  username: string;
}

interface Lesson {
  _id: string;
  name: string;
  description: string;
  rating: number;
  comments: string[];
  creator: string;
  chapters: Chapter[];
}

interface Chapter {
  _id: string;
  name: string;
  index: number;
  content: string;
  lesson: string;
  test: Test;
  creator: string;
}

interface Test {
  [key: string]: string | [TestCase];
  _id: string;
  chapter: string;
  testType: string;
  className: string;
  methodName: string;

  javascript: string;
  cpp: string;
  rust: string;
  python: string;
  java: string;

  testCases: [TestCase];
  creator: string;
}

interface TestCase {
  _id: string;
  test: string;
  parameters: any[];
  expectedOutput: any;
  creator: string;
}

interface Results {
  results: [
    {
      expected: string,
      inputs: string,
      output: string,
      status: string
    }
  ],
  error?: string,
  passCount: number,
  passed: boolean,
  time: string,
}

interface Solution {
  [key: string]: string,
  _id: string,
  javascript: string,
  cpp: string,
  rust: string,
  python: string,
  java: string,
  test: string,
  creator: string,
}

import { ObservableInput } from "rxjs";
export interface Suspenseable {
  setup(): ObservableInput<any>;
}
