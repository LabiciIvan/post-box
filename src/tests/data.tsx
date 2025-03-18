import { InboxType, User } from '../types';
import BillImage from '../assets/bill.png';
import JoeImage from '../assets/joe.png';
import AnnieImage from '../assets/annie.png';

let logoutAfterObj = new Date();

logoutAfterObj.setHours(logoutAfterObj.getHours() + 1);

const users: User[] = [
  {
    id: 0,
    name: 'Bill',
    email: 'bill@mail.com',
    password: 'pwd',
    image: BillImage,
    remeberLoggedIn: false,
    logoutAfter: logoutAfterObj.toLocaleString(),
  },
  {
    id: 1,
    name: 'Joe',
    email: 'joe@mail.com',
    password: 'pwd',
    image: JoeImage,
    remeberLoggedIn: false,
    logoutAfter: logoutAfterObj.toLocaleString(),
  },
  {
    id: 2,
    name: 'Annie',
    email: 'annie@mail.com',
    password: 'pwd',
    image: AnnieImage,
    remeberLoggedIn: false,
    logoutAfter: logoutAfterObj.toLocaleString(),
  }
];

const inboxData: InboxType[] = [
{
  belongsTo: 1,
  inbox: [
    {
      id: 'a47ac10b-58cc-4372-a567-0e02b2c3d479',
      timestamp: '1/15/2025, 3:41:16 PM',
      cc: [{ email: 'annie@mail.com' }],
      sender: { id: 1, name: 'Joe', email: 'joe@mail.com' },
      receiver: [{ email: 'bill@mail.com' }],
      title: 'Email test from Joe',
      message: `Welcome \n Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Voluptas fuga, cumque, perferendis eius dignissimos saepe qui quas molestiae asperiores
      dolorum omnis mollitia obcaecati beatae libero voluptates nam vel ad dolor.`,
      emailRead: false
    },
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      timestamp: '1/16/2025, 10:20:00 AM',
      cc: [{ email: 'bill@mail.com' }],
      sender: { id: 2, name: 'Annie', email: 'annie@mail.com' },
      receiver: [{ email: 'joe@mail.com' }],
      title: 'Follow-up on our discussion',
      message: `Hey Joe, I just wanted to follow up on our last conversation. 
      Let me know when you're available to chat.`,
      emailRead: false
    },
    {
      id: "b82f6e1c-3f9d-4a5e-8c7a-0e02b2c3d479",
      timestamp: "1/16/2025, 10:15:23 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Project Update",
      message: "Hi Joe,\nJust wanted to give you a quick update on the project. Everything is on track, and we should be able to meet the deadline.\nBest,\nBill",
      emailRead: false
    },
    {
      id: "c93a7d2e-4f8e-5b6f-9d1c-0e02b2c3d479",
      timestamp: "1/17/2025, 2:30:45 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Meeting Reminder",
      message: "Hi Annie,\nDon't forget about our meeting tomorrow at 10 AM. Please come prepared with the quarterly report.\nCheers,\nJoe",
      emailRead: false
    },
    {
      id: "d84b8e3f-5a9f-6c7d-8e2d-0e02b2c3d479",
      timestamp: "1/18/2025, 9:00:12 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Feedback Request",
      message: "Hi Bill,\nCould you please provide feedback on the latest design mockups by the end of the day?\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "e75c9f4a-6b8e-7d9f-1e3f-0e02b2c3d479",
      timestamp: "1/19/2025, 4:20:34 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Budget Approval",
      message: "Hi Joe,\nI need your approval on the revised budget for the Q2 project. Please review and let me know if you have any concerns.\nRegards,\nBill",
      emailRead: false
    },
    {
      id: "f66d8e5b-7c9f-8e1a-2f4b-0e02b2c3d479",
      timestamp: "1/20/2025, 11:45:56 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Client Onboarding",
      message: "Hi Annie,\nWe have a new client onboarding next week. Please prepare the necessary documents and ensure everything is in order.\nBest,\nJoe",
      emailRead: false
    },
    {
      id: "g77e9f6c-8d1e-9f2b-3c5d-0e02b2c3d479",
      timestamp: "1/21/2025, 3:15:22 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Team Lunch",
      message: "Hi Bill,\nLet's organize a team lunch next Friday. Please let me know if you have any preferences for the venue.\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "h88f1e7d-9e2f-1a3c-4d6e-0e02b2c3d479",
      timestamp: "1/22/2025, 8:30:11 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Software Update",
      message: "Hi Joe,\nThe new software update is ready for deployment. Please review the release notes and let me know if you have any concerns.\nRegards,\nBill",
      emailRead: false
    },
    {
      id: "i99g2f8e-1f3d-2b4e-5f7g-0e02b2c3d479",
      timestamp: "1/23/2025, 1:00:45 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Training Session",
      message: "Hi Annie,\nWe have a training session scheduled for next Monday. Please ensure all team members are informed.\nCheers,\nJoe",
      emailRead: false
    },
    {
      id: "j10h3g9f-2g4e-3c5f-6h8i-0e02b2c3d479",
      timestamp: "1/24/2025, 10:45:33 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Client Meeting",
      message: "Hi Bill,\nWe have a client meeting tomorrow at 2 PM. Please prepare the presentation and ensure all data is up-to-date.\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "k21i4h0g-3h5f-4d6g-7i9j-0e02b2c3d479",
      timestamp: "1/25/2025, 5:00:22 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Quarterly Review",
      message: "Hi Joe,\nThe quarterly review meeting is scheduled for next week. Please prepare the necessary reports and data.\nBest,\nBill",
      emailRead: false
    },
    {
      id: "l32j5i1h-4i6g-5e7h-8j0k-0e02b2c3d479",
      timestamp: "1/26/2025, 9:15:44 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Project Proposal",
      message: "Hi Annie,\nI have a new project proposal that I'd like to discuss with you. Let's set up a meeting to go over the details.\nCheers,\nJoe",
      emailRead: false
    },
    {
      id: "m43k6j2i-5j7h-6f8i-9k1l-0e02b2c3d479",
      timestamp: "1/27/2025, 2:45:55 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Website Update",
      message: "Hi Bill,\nThe website update is live. Please review and let me know if you notice any issues.\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "n54l7k3j-6k8i-7g9j-0l2m-0e02b2c3d479",
      timestamp: "1/28/2025, 11:30:33 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Team Building Event",
      message: "Hi Joe,\nWe're planning a team-building event next month. Please let me know your availability.\nRegards,\nBill",
      emailRead: false
    },
    {
      id: "o65m8l4k-7l9j-8h0k-1m3n-0e02b2c3d479",
      timestamp: "1/29/2025, 4:00:22 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Product Launch",
      message: "Hi Annie,\nThe product launch is scheduled for next week. Please ensure all marketing materials are ready.\nBest,\nJoe",
      emailRead: false
    },
    {
      id: "p76n9m5l-8m0k-9i1l-2n4o-0e02b2c3d479",
      timestamp: "1/30/2025, 10:15:11 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Monthly Report",
      message: "Hi Bill,\nThe monthly report is ready for your review. Please let me know if you need any additional information.\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "q87o0n6m-9n1l-0j2m-3o5p-0e02b2c3d479",
      timestamp: "1/31/2025, 3:45:44 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Client Feedback",
      message: "Hi Joe,\nWe've received some feedback from the client. Let's discuss how we can address their concerns.\nRegards,\nBill",
      emailRead: false
    },
    {
      id: "r98p1o7n-0o2m-1k3n-4p6q-0e02b2c3d479",
      timestamp: "2/1/2025, 9:00:33 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Hire Onboarding",
      message: "Hi Annie,\nWe have a new hire starting next week. Please ensure all onboarding materials are ready.\nCheers,\nJoe",
      emailRead: false
    },
    {
      id: "s09q2p8o-1p3n-2l4o-5q7r-0e02b2c3d479",
      timestamp: "2/2/2025, 2:30:22 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Project Deadline",
      message: "Hi Bill,\nThe project deadline is approaching. Please ensure all tasks are completed on time.\nThanks,\nAnnie",
      emailRead: false
    },
    {
      id: "t10r3q9p-2q4o-3m5p-6r8s-0e02b2c3d479",
      timestamp: "2/3/2025, 11:15:11 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Budget Review",
      message: "Hi Joe,\nLet's review the budget for the upcoming quarter. Please prepare the necessary documents.\nBest,\nBill",
      emailRead: false
    },
    {
      id: "u21s4r0q-3r5p-4n6q-7s9t-0e02b2c3d479",
      timestamp: "2/4/2025, 4:45:33 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Team Meeting",
      message: "Hi Annie,\nWe have a team meeting scheduled for tomorrow. Please come prepared with updates on your tasks.\nCheers,\nJoe",
      emailRead: false
    }
  ],
  draft: [
    {
      id: 'b47ac10b-58cc-4372-a567-0e02b2c3d479',
      timestamp: '1/17/2025, 12:45:00 PM',
      cc: [{ email: 'annie@mail.com' }],
      sender: { id: 0, name: 'Bill', email: 'bill@mail.com' },
      receiver: [{ email: 'joe@mail.com' }],
      title: 'Project Update',
      message: `Joe, I have some updates regarding the project. 
      I'll send the details soon.`,
      emailRead: true
    }
  ],
  sent: [
    {
      id: 'c47ac10b-58cc-4372-a567-0e02b2c3d479',
      timestamp: '1/18/2025, 9:15:00 AM',
      cc: [{ email: 'joe@mail.com' }],
      sender: { id: 0, name: 'Bill', email: 'bill@mail.com' },
      receiver: [{ email: 'annie@mail.com' }],
      title: 'Meeting Scheduled',
      message: `Hi Annie, the meeting is scheduled for tomorrow at 3 PM. 
      Please confirm your availability.`,
      emailRead: true
    }
  ],
  deleted: [
    {
      id: 'd47ac10b-58cc-4372-a567-0e02b2c3d479',
      timestamp: '1/19/2025, 5:00:00 PM',
      cc: [{ email: 'annie@mail.com' }],
      sender: { id: 1, name: 'Joe', email: 'joe@mail.com' },
      receiver: [{ email: 'bill@mail.com' }],
      title: 'Re: Email test from Joe',
      message: `Bill, I got your email. I’ll get back to you soon.`,
      emailRead: true
    }
  ],
  results: []
},
{
  belongsTo: 0,
  inbox: [
    {
      id: "a47ac10b-58cc-4372-a567-0e02b2c3d479",
      timestamp: "1/15/2025, 3:41:16 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Email test from Joe",
      message: "Welcome \n Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas fuga, cumque, perferendis eius dignissimos saepe qui quas molestiae asperiores dolorum omnis mollitia obcaecati beatae libero voluptates nam vel ad dolor.",
      emailRead: false
    },
    {
      id: "b47ac10b-58cc-4372-a567-0e02b2c3d480",
      timestamp: "1/16/2025, 10:15:23 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Project Update",
      message: "Hi Annie, the project is progressing well. Let's discuss the next steps.",
      emailRead: false
    },
    {
      id: "c47ac10b-58cc-4372-a567-0e02b2c3d481",
      timestamp: "1/17/2025, 2:30:45 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Meeting Reminder",
      message: "Hi Annie, don't forget about our meeting tomorrow at 10 AM.",
      emailRead: false
    },
    {
      id: "d47ac10b-58cc-4372-a567-0e02b2c3d482",
      timestamp: "1/18/2025, 9:00:12 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Feedback Request",
      message: "Hi Bill, could you please provide feedback on the latest design mockups?",
      emailRead: false
    },
    {
      id: "e47ac10b-58cc-4372-a567-0e02b2c3d483",
      timestamp: "1/19/2025, 4:20:34 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Budget Approval",
      message: "Hi Joe, I need your approval on the revised budget for the Q2 project.",
      emailRead: false
    },
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d484",
      timestamp: "1/20/2025, 11:45:56 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Client Onboarding",
      message: "Hi Annie, we have a new client onboarding next week. Please prepare the necessary documents.",
      emailRead: false
    },
    {
      id: "g47ac10b-58cc-4372-a567-0e02b2c3d485",
      timestamp: "1/21/2025, 3:15:22 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Team Lunch",
      message: "Hi Bill, let's organize a team lunch next Friday. Please let me know your preferences.",
      emailRead: false
    },
    {
      id: "h47ac10b-58cc-4372-a567-0e02b2c3d486",
      timestamp: "1/22/2025, 8:30:11 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Software Update",
      message: "Hi Joe, the new software update is ready for deployment. Please review the release notes.",
      emailRead: false
    },
    {
      id: "i47ac10b-58cc-4372-a567-0e02b2c3d487",
      timestamp: "1/23/2025, 1:00:45 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Training Session",
      message: "Hi Annie, we have a training session scheduled for next Monday. Please ensure all team members are informed.",
      emailRead: false
    },
    {
      id: "j47ac10b-58cc-4372-a567-0e02b2c3d488",
      timestamp: "1/24/2025, 10:45:33 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Client Meeting",
      message: "Hi Bill, we have a client meeting tomorrow at 2 PM. Please prepare the presentation.",
      emailRead: false
    },
    {
      id: "k47ac10b-58cc-4372-a567-0e02b2c3d489",
      timestamp: "1/25/2025, 5:00:22 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Quarterly Review",
      message: "Hi Joe, the quarterly review meeting is scheduled for next week. Please prepare the necessary reports.",
      emailRead: false
    },
    {
      id: "l47ac10b-58cc-4372-a567-0e02b2c3d490",
      timestamp: "1/26/2025, 9:15:44 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Project Proposal",
      message: "Hi Annie, I have a new project proposal that I'd like to discuss with you. Let's set up a meeting.",
      emailRead: false
    },
    {
      id: "m47ac10b-58cc-4372-a567-0e02b2c3d491",
      timestamp: "1/27/2025, 2:45:55 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Website Update",
      message: "Hi Bill, the website update is live. Please review and let me know if you notice any issues.",
      emailRead: false
    },
    {
      id: "n47ac10b-58cc-4372-a567-0e02b2c3d492",
      timestamp: "1/28/2025, 11:30:33 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Team Building Event",
      message: "Hi Joe, we're planning a team-building event next month. Please let me know your availability.",
      emailRead: false
    },
    {
      id: "o47ac10b-58cc-4372-a567-0e02b2c3d493",
      timestamp: "1/29/2025, 4:00:22 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Product Launch",
      message: "Hi Annie, the product launch is scheduled for next week. Please ensure all marketing materials are ready.",
      emailRead: false
    },
    {
      id: "p47ac10b-58cc-4372-a567-0e02b2c3d494",
      timestamp: "1/30/2025, 10:15:11 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Monthly Report",
      message: "Hi Bill, the monthly report is ready for your review. Please let me know if you need any additional information.",
      emailRead: false
    },
    {
      id: "q47ac10b-58cc-4372-a567-0e02b2c3d495",
      timestamp: "1/31/2025, 3:45:44 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Client Feedback",
      message: "Hi Joe, we've received some feedback from the client. Let's discuss how we can address their concerns.",
      emailRead: false
    },
    {
      id: "r47ac10b-58cc-4372-a567-0e02b2c3d496",
      timestamp: "2/1/2025, 9:00:33 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Hire Onboarding",
      message: "Hi Annie, we have a new hire starting next week. Please ensure all onboarding materials are ready.",
      emailRead: false
    },
    {
      id: "s47ac10b-58cc-4372-a567-0e02b2c3d497",
      timestamp: "2/2/2025, 2:30:22 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Project Deadline",
      message: "Hi Bill, the project deadline is approaching. Please ensure all tasks are completed on time.",
      emailRead: false
    }
  ],
  draft: [
    {
      id: "t47ac10b-58cc-4372-a567-0e02b2c3d498",
      timestamp: "1/17/2025, 12:45:00 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Project Update",
      message: "Joe, I have some updates regarding the project. I'll send the details soon.",
      emailRead: true
    },
    {
      id: "u47ac10b-58cc-4372-a567-0e02b2c3d499",
      timestamp: "1/18/2025, 9:15:00 AM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Meeting Scheduled",
      message: "Hi Annie, the meeting is scheduled for tomorrow at 3 PM. Please confirm your availability.",
      emailRead: true
    }
  ],
  sent: [
    {
      id: "v47ac10b-58cc-4372-a567-0e02b2c3d500",
      timestamp: "1/19/2025, 5:00:00 PM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Re: Email test from Joe",
      message: "Bill, I got your email. I’ll get back to you soon.",
      emailRead: true
    },
    {
      id: "w47ac10b-58cc-4372-a567-0e02b2c3d501",
      timestamp: "1/20/2025, 11:45:56 AM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "New Client Onboarding",
      message: "Hi Annie, we have a new client onboarding next week. Please prepare the necessary documents.",
      emailRead: true
    },
    {
      id: "x47ac10b-58cc-4372-a567-0e02b2c3d502",
      timestamp: "1/21/2025, 3:15:22 PM",
      cc: [{ "email": "joe@mail.com" }],
      sender: { "id": 2, "name": "Annie", "email": "annie@mail.com" },
      receiver: [{ "email": "bill@mail.com" }],
      title: "Team Lunch",
      message: "Hi Bill, let's organize a team lunch next Friday. Please let me know your preferences.",
      emailRead: true
    },
    {
      id: "y47ac10b-58cc-4372-a567-0e02b2c3d503",
      timestamp: "1/22/2025, 8:30:11 AM",
      cc: [{ "email": "annie@mail.com" }],
      sender: { "id": 0, "name": "Bill", "email": "bill@mail.com" },
      receiver: [{ "email": "joe@mail.com" }],
      title: "Software Update",
      message: "Hi Joe, the new software update is ready for deployment. Please review the release notes.",
      emailRead: true
    },
    {
      id: "z47ac10b-58cc-4372-a567-0e02b2c3d504",
      timestamp: "1/23/2025, 1:00:45 PM",
      cc: [{ "email": "bill@mail.com" }],
      sender: { "id": 1, "name": "Joe", "email": "joe@mail.com" },
      receiver: [{ "email": "annie@mail.com" }],
      title: "Training Session",
      message: "Hi Annie, we have a training session scheduled for next Monday. Please ensure all team members are informed.",
      emailRead: true
    }
  ],
  deleted: [],
  results: [],
}];


export {
  users,
  inboxData
}