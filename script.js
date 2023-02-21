(function () {
  let indexVar;
  var tempId = "#message-buttons-";
  var chat = {
    messageToSend: "",
    messageResponses: [
      "Here is an example of of a single button:",
      "Here is an example of two buttons:",
      "Here is an example of three buttons:",
      "Here is an example of four buttons:",
      "Here is a misspelled button:",
      "Here is an unexpected button:",
      "Sorry I only speak in buttons... and other bits.",
      "Pick a card... any card",
      "Okay... Okay... One moment...",
      "Because you asked so nicely",
      "Most of my buttons are now clickable. Give it a try, you may find something you like!",
      "Here is an example of buttons that share the same text values as the dialogue",
      "Click found!",
      "Cool - lets begin!",
      "This is a click only example. You'll see the text area is currently disabled until you click the below button:",
    ],
    buttons: [
      "Button One",
      "Button Two",
      "Button Three",
      "Button Four",
      "Mispeld Button",
      "Un-expected Buttton",
      "You can say: One button, Two buttons, Three buttons, Four buttons, Misspelled button or Unexpected button",
    ],
    init: function () {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function () {
      this.$chatHistory = $(".chat-history");
      this.$button = $("button");
      this.$textarea = $("#message-to-send");
      this.$chatHistoryList = this.$chatHistory.find("ul");
    },
    bindEvents: function () {
      this.$button.on("click", this.addMessage.bind(this));
      this.$textarea.on("keyup", this.addMessageEnter.bind(this));
    },
    render: function () {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== "") {
        var template = Handlebars.compile($("#message-template").html());
        var context = {
          messageOutput: this.messageToSend,
          time: this.getCurrentTime(),
        };

        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val("");

        // responses
        var templateResponse = Handlebars.compile(
          $("#message-response-template").html()
        );
        var contextResponse = {
          response: this.messageResponses[indexVar],
          time: this.getCurrentTime(),
        };

        //button responses
        var buttonResponse = Handlebars.compile($(tempId).html());
        var contextbuttonResponse = {
          buttons: this.buttons[indexVar],
        };

        setTimeout(
          function () {
            this.$chatHistoryList.append(templateResponse(contextResponse));
            this.scrollToBottom();
          }.bind(this),
          1500
        );
        setTimeout(
          function () {
            this.$chatHistoryList.append(buttonResponse(contextbuttonResponse));
            this.scrollToBottom();
          }.bind(this),
          3000
        );
      }
    },
    addMessage: function () {
      this.messageToSend = this.$textarea.val();
      const expr = this.messageToSend.trim();
      switch (expr) {
        case "One button":
        case "one button":
          indexVar = 0;
          tempId = "#message-buttons-0";
          break;
        case "Two buttons":
        case "two buttons":
          indexVar = 1;
          tempId = "#message-buttons-1";
          break;
        case "Three buttons":
        case "three buttons":
          indexVar = 2;
          tempId = "#message-buttons-2";
          break;
        case "Four buttons":
        case "four buttons":
          indexVar = 3;
          tempId = "#message-buttons-3";
          break;
        case "Misspelled button":
        case "misspelled button":
          indexVar = 4;
          tempId = "#message-buttons-4";
          break;
        case "Unexpected button":
        case "unexpected button":
          indexVar = 5;
          tempId = "#message-buttons-5";
          break;
        case "Card":
        case "card":
          indexVar = 7;
          tempId = "#message-rich-0";
          break;
        case "Card list":
        case "card list":
          indexVar = 7;
          tempId = "#message-rich-7";
          break;
        case "Rich text":
        case "rich text":
          indexVar = 8;
          tempId = "#message-rich-1";
          break;
        case "Text with button":
        case "text with button":
          indexVar = 9;
          tempId = "#message-rich-2";
          break;
        case "Nested order":
        case "nested order":
          indexVar = 9;
          tempId = "#message-rich-3";
          break;
        case "View profile":
        case "view profile":
        case "More about Button Bot":
          indexVar = 9;
          tempId = "#profile-0";
          break;
        case "More about James":
          indexVar = 9;
          tempId = "#profile-1";
          break;
        case "More about Brandon":
          indexVar = 9;
          tempId = "#profile-2";
          break;
        case "More about Benoit":
          indexVar = 9;
          tempId = "#profile-3";
          break;
        case "Clickable buttons":
        case "clickable buttons":
          indexVar = 10;
          tempId = "#message-buttons-6";
          break;
        case "Surprise me":
        case "surprise me":
          indexVar = 9;
          tempId = "#message-rich-5";
          break;
        case "Same text button":
        case "same text button":
          indexVar = 11;
          tempId = "#message-buttons-7";
          break;
        case "may contain":
          indexVar = 12;
          tempId = "#you-clicked-0";
          break;
        case "text as button:":
          indexVar = 12;
          tempId = "#you-clicked-1";
          break;
        case "journey begin":
        case "Journey begin":
        case "begin journey":
        case "Begin journey":
          indexVar = 13;
          tempId = "#journey-0";
          break;
        case "begin":
          indexVar = 12;
          tempId = "#journey-1";
          break;
        case "continue":
          indexVar = 12;
          tempId = "#journey-2";
          break;
        case "keep going":
          indexVar = 12;
          tempId = "#journey-3";
          break;
        case "exit":
          indexVar = 12;
          tempId = "#journey-exit";
          break;
        case "click only":
        case "Click only":
          indexVar = 14;
          tempId = "#click-only";
          clickOnly();
          break;
        case "Click me":
          indexVar = 12;
          tempId = "#click-only-0";
          break;
        //default
        default:
          indexVar = 6;
          tempId = "#message-options";
      }
      this.render();
    },
    addMessageEnter: function (event) {
      // enter was pressed
      if (event.keyCode === 13) {
        this.addMessage();
      }
    },
    scrollToBottom: function () {
      this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function () {
      return new Date()
        .toLocaleTimeString()
        .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
  };

  chat.init();
})();

function submitText() {
  var button = event.target;
  var buttonText = button.innerHTML;
  document.getElementById("message-to-send").value = buttonText;
  document.getElementById("submit-button").click();
}

function clickOnly() {
  document.getElementById("message-to-send").disabled = true;
}

function clickContinue() {
  var button = event.target;
  var buttonText = button.innerHTML;
  document.getElementById("message-to-send").disabled = false;
  document.getElementById("message-to-send").value = buttonText;
  document.getElementById("submit-button").click();
}