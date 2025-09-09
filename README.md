1. What is the difference between var, let, and const?

Ans:
(i) var : var হলো function scoped অথবা function এর বাইরে ঘোষণা করা হলে global scoped হয়। কোনো ব্লকের ভেতরে var দিয়ে ভ্যারিয়েবল ডিক্লেয়ার করলে সেটিকে বাইরে থেকেও অ্যাক্সেস করা যায়। একই scope-এ এটিকে আবার redeclare করা যায়।
(ii) let : let হলো block scoped। একই scope-এ এটিকে redeclare করা যায় না, তবে এর value পরিবর্তন করা যায়।
(iii) const : const ও block scoped। এটিকে redeclare বা reassign করা যায় না (primitive data এর জন্য)। এটি এমন value সংরক্ষণে ব্যবহার হয় যা পরে পরিবর্তন করা হবে না।

2. What is the difference between map(), forEach(), and filter?

Ans:
(i) forEach() : এটি array-র প্রতিটি element এর জন্য একটি function execute করে। নতুন কোনো array তৈরি করে না। return value হলো undefined।
(ii) map() : এটি array-র data পরিবর্তন করে এবং একই length এর একটি নতুন array return করে।
(iii) filter() : এটি শর্ত অনুযায়ী array থেকে data ফিল্টার করে নতুন array তৈরি করে এবং সেই ফিল্টারকৃত data return করে।

3. What are arrow functions in ES6?

Ans: Arrow Function হলো JavaScript এ function লেখার একটি ছোট এবং সহজ পদ্ধতি। এখানে => চিহ্ন ব্যবহার করা হয়। Arrow Function এর নিজস্ব this থাকে না।

4. How does destructuring assignment work in ES6?

Ans: Destructuring assignment ব্যবহার করে আমরা array থেকে value সরাসরি variable-এ নিতে পারি। object থেকেও property name দ্বারা value সরাসরি destructuring এর মাধ্যমে নেওয়া যায়।
উদাহরণ:
const [one, two, three] = ["Alim", "Jalim", "Dalim"];


5. Explain template literals in ES6. How are they different from string concatenation?

Ans: Template literals হলো backticks (`) এর মধ্যে লেখা string। এখানে dynamic ভাবে variable ব্যবহার করা যায়। একাধিক লাইনে লেখা যায়, + দিয়ে আলাদা করে concatenate করার দরকার হয় না। ${variable} ব্যবহার করে variable string এর ভেতর বসানো যায় এবং \n ছাড়াই নতুন লাইনে লেখা সম্ভব। এতে কোড আরও সহজপাঠ্য এবং সুন্দর হয়।
