export const ussdTemplate = {
    "version": "1.0",
    "flow": {
      "id": "template-ussd-flow",
      "name": "USSD Template Flow",
      "nodes": [
        {
          "id": "node-1",
          "type": "request",
          "position": { "x": 100, "y": 100 },
          "data": {
            "label": "Initial Request",
            "config": {
              "type": "Initiation",
              "platform": "USSD",
              "operator": "mtn",
              "mobile": "233547469379",
              "ussdCode": "*713#",
              "serviceCode": "70972a31e8e443c69ed189160590d7cf"
            }
          }
        },
        {
          "id": "node-2",
          "type": "response",
          "position": { "x": 400, "y": 100 },
          "data": {
            "label": "Main Menu",
            "config": {
              "type": "Response",
              "platform": "USSD",
              "operator": "mtn",
              "dataType": "menu",
              "data": [
                { "display": "Check Balance", "value": "1" },
                { "display": "Send Money", "value": "2" },
                { "display": "Buy Airtime", "value": "3" },
                { "display": "Pay Bill", "value": "4" }
              ]
            }
          }
        },
        {
          "id": "node-3",
          "type": "response",
          "position": { "x": 700, "y": 100 },
          "data": {
            "label": "Enter Amount",
            "config": {
              "type": "Response",
              "platform": "USSD",
              "operator": "mtn",
              "dataType": "input",
              "message": "Enter amount"
            }
          }
        },
        {
          "id": "node-4",
          "type": "response",
          "position": { "x": 1000, "y": 100 },
          "data": {
            "label": "Transaction Complete",
            "config": {
              "type": "Release",
              "platform": "USSD",
              "operator": "mtn",
              "dataType": "display",
              "message": "Transaction completed successfully.\nThank you for using our service."
            }
          }
        }
      ],
      "edges": [
        {
          "id": "edge-1-2",
          "source": "node-1",
          "target": "node-2"
        },
        {
          "id": "edge-2-3",
          "source": "node-2",
          "target": "node-3"
        },
        {
          "id": "edge-3-4",
          "source": "node-3",
          "target": "node-4"
        }
      ],
      "createdAt": new Date(),
      "updatedAt": new Date()
    }
  };