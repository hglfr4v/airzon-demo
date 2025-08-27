const chats = [
    {
    name: "Phillipe François",
    org: "Aeroservices",
    msg: "Hello Jean-Jacques, how are you?",
    time: "11:00",
    unread: 1,
    group: false,
    messages: [
      { from: "Phillipe François", text: "Hello Jean-Jacques, how are you?", time: "10:59", self: false },
      { from: "Jean-Jacques", text: "I'm well, thank you! Any news?", time: "11:00", self: true },
      { from: "Phillipe François", text: "Yes, please check the quote I sent.", time: "11:00", self: false }
    ]
  },
  {
    name: "Paris Event",
    org: "Super repair services",
    msg: "Thank you, Jean-Jacques, we are...",
    time: "10:56",
    unread: 1,
    group: true,
    messages: [
      { from: "Paris Event", text: "Looking forward to seeing everyone at the event!", time: "10:54", self: false },
      { from: "Jean-Jacques", text: "Thank you, looking forward", time: "10:55", self: true }
    ]
  },
  {
    name: "Marko Hilo",
    org: "Tech&Co aero",
    msg: "Are you still having the last item in ...",
    time: "10:45",
    unread: 2,
    group: false,
    messages: [
      { from: "Marko Hilo", text: "Are you still having the last item in stock?", time: "10:44", self: false },
      { from: "Jean-Jacques", text: "Yes, we do! Would you like to order?", time: "10:45", self: true }
    ]
  },
  {
    name: "Marca Deli",
    org: "Info services",
    msg: "Thank you for the feedback!",
    time: "10:36",
    unread: 0,
    group: false,
    messages: [
      { from: "Marca Deli", text: "Thank you for the feedback!", time: "10:36", self: false }
    ]
  },
  {
    name: "Phillipe François",
    org: "Aeroservices",
    msg: "Hello Jean-Jacques, how are you?",
    time: "11:00",
    unread: 1,
    group: false,
  },
  {
    name: "Lisbon Event",
    org: "AirGlobal",
    msg: "Thank you, Jean-Jacques, we are...",
    time: "10:56",
    unread: 1,
    group: true,
  },
  {
    name: "Marko Hilo",
    org: "Tech&Co aero",
    msg: "Are you still having the last item in ...",
    time: "10:45",
    unread: 2,
    group: false,
  },
  {
    name: "Marca Deli",
    org: "Lion technical services",
    msg: "Thank you for the feedback!",
    time: "10:36",
    unread: 0,
    group: false,
  },
  {
    name: "Jenna Spencer",
    org: "News Aero",
    msg: "Let's see!",
    time: "Yesterday",
    unread: 0,
    group: false,
  },
  {
    name: "Elena Richter",
    org: "SkyEngines",
    msg: "Hi, did you check the updated quote?",
    time: "10:42",
    unread: 1,
    group: false,
  },
  {
    name: "Marcus Tanaka",
    org: "JetBridge",
    msg: "We're confirming the delivery date.",
    time: "10:38",
    unread: 0,
    group: false,
  },
  {
    name: "Camille Dupont",
    org: "AeroParts EU",
    msg: "Got the parts, thanks again!",
    time: "Yesterday",
    unread: 0,
    group: false,
  },
  {
    name: "AG Conference",
    org: "Hosted by: MRO Group",
    msg: "Agenda is ready for next week.",
    time: "Yesterday",
    unread: 3,
    group: true,
  },
  {
    name: "Lucas Moretti",
    org: "FlightLogix",
    msg: "Let’s catch up before EOD?",
    time: "Yesterday",
    unread: 0,
    group: false,
  },
  {
    name: "Marta Silva",
    org: "Parts Aerie",
    msg: "Thanks for the feedback!",
    time: "2d ago",
    unread: 0,
    group: false,
  }
];

export default chats;