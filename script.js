(function () {
  let indexVar;
  var tempId = "#message-buttons-";
  let buttonTemplate = tempId + indexVar;
  var chat = {
    messageToSend: "",
    messageResponses: [
      "Here is an example of of a single button:",
      "Here is an example of two buttons:",
      "Here is an example of three buttons:",
      "Here is an example of four buttons:",
      "Here is a misspelled button:",
      "Here is an unexpected button:",
      "Sorry I only speak in buttons...",
      "Pick a card... any card",
      "Okay... Okay... One moment...",
      "Because you asked so nicely"
    ],
    buttons: [
      "Button One",
      "Button Two",
      "Button Three",
      "Button Four",
      "Mispeld Button",
      "Un-expected Buttton",
      "You can say: One button, Two buttons, Three buttons, Four buttons, Misspelled button or Unexpected button"
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
          time: this.getCurrentTime()
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
          time: this.getCurrentTime()
        };

        //button responses
        var buttonResponse = Handlebars.compile($(tempId).html());
        var contextbuttonResponse = {
          buttons: this.buttons[indexVar]
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
          indexVar = 0;
          tempId = "#message-buttons-0";
          break;
        case "Two buttons":
          indexVar = 1;
          tempId = "#message-buttons-1";
          break;
        case "Three buttons":
          indexVar = 2;
          tempId = "#message-buttons-2";
          break;
        case "Four buttons":
          indexVar = 3;
          tempId = "#message-buttons-3";
          break;
        case "Misspelled button":
          indexVar = 4;
          tempId = "#message-buttons-4";
          break;
        case "Unexpected button":
          indexVar = 5;
          tempId = "#message-buttons-5";
            break;
        case "Card":
          indexVar = 7;
          tempId = "#message-rich-0";
              break;
        case "Rich text":
            indexVar = 8;
            tempId = "#message-rich-1";
            break;
        case "Text with button":
            indexVar = 9;
            tempId = "#message-rich-2";
              break;
          case "Nested order":
              indexVar = 9;
              tempId = "#message-rich-3";
              break;
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
    }
  };

  chat.init();
})();
