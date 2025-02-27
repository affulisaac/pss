export const mallTemplate = {
  version: "1.0",
  flow: {
    id: "1740132354186",
    name: "Exported Flow 3",
    nodes: [
      {
        id: "node-1",
        type: "request",
        position: {
          x: -135.57497787701124,
          y: -142.11511517857355,
        },
        data: {
          label: "Initial Request",
          config: {
            type: "Initiation",
            platform: "USSD",
            operator: "mtn",
            data: [],
            mobile: "0574469379",
            ussdCode: "*713#",
            serviceCode: "64545",
          },
        },
        width: 200,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: -135.57497787701124,
          y: -142.11511517857355,
        },
        dragging: false,
      },
      {
        id: "node-2",
        type: "response",
        position: {
          x: 137.2223757196823,
          y: -196.02406527859233,
        },
        data: {
          label: "Main Menu",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "Airtime and Data",
                value: "0",
              },
              {
                display: "Car Insurance",
                value: "1",
              },
              {
                display: "Pay a Business",
                value: "2",
              },
              {
                display: "Web Login",
                value: "3",
              },
            ],
            dataType: "menu",
          },
        },
        width: 222,
        height: 161,
        selected: false,
        positionAbsolute: {
          x: 137.2223757196823,
          y: -196.02406527859233,
        },
        dragging: false,
      },
      {
        id: "node-3",
        type: "response",
        position: {
          x: 499.64823999568466,
          y: -385.65973658666934,
        },
        data: {
          label: "Airtime and Data",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "AirtelTigo",
                value: "0",
              },
              {
                display: "MTN",
                value: "1",
              },
              {
                display: "Telecel",
                value: "2",
              },
            ],
            dataType: "menu",
          },
        },
        width: 200,
        height: 141,
        selected: false,
        positionAbsolute: {
          x: 499.64823999568466,
          y: -385.65973658666934,
        },
        dragging: false,
      },
      {
        id: "node-4",
        type: "response",
        position: {
          x: 811.6177235940866,
          y: -379.67402863001917,
        },
        data: {
          label: "Enter Receipient",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "Buy for myself",
                value: "0",
              },
              {
                display: "Buy for someone else",
                value: "1",
              },
            ],
            dataType: "menu",
          },
        },
        width: 261,
        height: 121,
        selected: false,
        positionAbsolute: {
          x: 811.6177235940866,
          y: -379.67402863001917,
        },
        dragging: false,
      },
      {
        id: "node-5",
        type: "response",
        position: {
          x: 1431.5363983718482,
          y: -381.8491052247251,
        },
        data: {
          label: "Enter Amount",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "input",
            message: "How much do you want to buy",
          },
        },
        width: 200,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 1431.5363983718482,
          y: -381.8491052247251,
        },
        dragging: false,
      },
      {
        id: "node-6",
        type: "response",
        position: {
          x: 1826.521642444503,
          y: -200.9136021697816,
        },
        data: {
          label:
            "You will receive a payment prompt. Thank you for buying from Hubtel",
          config: {
            type: "Release",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "display",
            message:
              "You will receive a payment prompt.\nThank you for buying from Hubtel",
          },
        },
        width: 581,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 1826.521642444503,
          y: -200.9136021697816,
        },
        dragging: false,
      },
      {
        id: "node-7",
        type: "response",
        position: {
          x: 497.0270162631117,
          y: -176.85803776076477,
        },
        data: {
          label: "Welcome to Insurance. ",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "menu",
            message: "Enter the car number",
          },
        },
        width: 227,
        height: 81,
        selected: false,
        positionAbsolute: {
          x: 497.0270162631117,
          y: -176.85803776076477,
        },
        dragging: false,
      },
      {
        id: "node-8",
        type: "response",
        position: {
          x: 809.6714438128956,
          y: -195.68204030125105,
        },
        data: {
          label: "Response 7",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "Tes 3",
                value: "0",
              },
              {
                display: "test 4",
                value: "1",
              },
            ],
            dataType: "menu",
          },
        },
        width: 200,
        height: 121,
        selected: false,
        dragging: false,
        positionAbsolute: {
          x: 809.6714438128956,
          y: -195.68204030125105,
        },
      },
      {
        id: "node-10",
        type: "response",
        position: {
          x: 501.5838228163648,
          y: -28.398468619191064,
        },
        data: {
          label: "Response 9",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "GH QR Merchant",
                value: "0",
              },
              {
                display: "Hubtel Merchant",
                value: "1",
              },
            ],
            dataType: "menu",
          },
        },
        width: 227,
        height: 121,
        selected: false,
        positionAbsolute: {
          x: 501.5838228163648,
          y: -28.398468619191064,
        },
        dragging: false,
      },
      {
        id: "node-11",
        type: "response",
        position: {
          x: 505.9935155092438,
          y: 167.2322602198812,
        },
        data: {
          label: "Are you trying to login from hubtel.com?",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "Yes, It's me",
                value: "0",
              },
              {
                display: "No, It not me",
                value: "1",
              },
            ],
            dataType: "menu",
          },
        },
        width: 359,
        height: 121,
        selected: false,
        positionAbsolute: {
          x: 505.9935155092438,
          y: 167.2322602198812,
        },
        dragging: false,
      },
      {
        id: "node-11",
        type: "response",
        position: {
          x: 505.9935155092438,
          y: 167.2322602198812,
        },
        data: {
          label: "Are you trying to login from hubtel.com?",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [
              {
                display: "Yes, It's me",
                value: "0",
              },
              {
                display: "No, It not me",
                value: "1",
              },
            ],
            dataType: "menu",
          },
        },
        width: 359,
        height: 121,
        selected: false,
        positionAbsolute: {
          x: 505.9935155092438,
          y: 167.2322602198812,
        },
        dragging: false,
      },
      {
        id: "node-12",
        type: "response",
        position: {
          x: 803.5062792513792,
          y: -16.823222862096827,
        },
        data: {
          label: "Enter Merchant ID",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "input",
          },
        },
        width: 200,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 803.5062792513792,
          y: -16.823222862096827,
        },
        dragging: false,
      },
      {
        id: "node-13",
        type: "response",
        position: {
          x: 1136.4788870115478,
          y: -15.1745924740884,
        },
        data: {
          label: "Enter amount",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "input",
            message: "Enter amount ",
          },
        },
        width: 200,
        height: 64,
        selected: false,
        dragging: false,
        positionAbsolute: {
          x: 1136.4788870115478,
          y: -15.1745924740884,
        },
      },
      {
        id: "node-14",
        type: "response",
        position: {
          x: 1422.1605511853634,
          y: -16.823222862096827,
        },
        data: {
          label: "You will receive payment prompt",
          config: {
            type: "Release",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "display",
          },
        },
        width: 301,
        height: 64,
        selected: false,
        dragging: false,
        positionAbsolute: {
          x: 1422.1605511853634,
          y: -16.823222862096827,
        },
      },
      {
        id: "node-15",
        type: "response",
        position: {
          x: 971.015201310264,
          y: 129.92371635191265,
        },
        data: {
          label: "Enter the four digit on the screen",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "menu",
          },
        },
        width: 303,
        height: 81,
        selected: false,
        positionAbsolute: {
          x: 971.015201310264,
          y: 129.92371635191265,
        },
        dragging: false,
      },
      {
        id: "node-16",
        type: "response",
        position: {
          x: 968.815995979719,
          y: 238.11849356902135,
        },
        data: {
          label: "The Login attempt has been blocked",
          config: {
            type: "Release",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "display",
          },
        },
        width: 330,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 968.815995979719,
          y: 238.11849356902135,
        },
        dragging: false,
      },
      {
        id: "node-17",
        type: "response",
        position: {
          x: 1370.7926825521663,
          y: 128.68009822298032,
        },
        data: {
          label: "You will be redirected shortly",
          config: {
            type: "Release",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "display",
          },
        },
        width: 274,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 1370.7926825521663,
          y: 128.68009822298032,
        },
        dragging: false,
      },
      {
        id: "node-18",
        type: "response",
        position: {
          x: 1153.2153756446905,
          y: -303.3164893539994,
        },
        data: {
          label: "Enter Phone number",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
            dataType: "input",
          },
        },
        width: 208,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 1153.2153756446905,
          y: -303.3164893539994,
        },
        dragging: false,
      },
      {
        id: "node-1740039756818",
        type: "response",
        position: {
          x: 1139.0166947689947,
          y: -116.80439675693808,
        },
        data: {
          label: "Response 18",
          config: {
            type: "Response",
            platform: "USSD",
            operator: "mtn",
            data: [],
          },
        },
        width: 200,
        height: 64,
        selected: false,
        positionAbsolute: {
          x: 1139.0166947689947,
          y: -116.80439675693808,
        },
        dragging: false,
      },
    ],
    edges: [
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-4",
        sourceHandle: null,
        target: "node-5",
        targetHandle: null,
        id: "reactflow__edge-node-4-node-5",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-5",
        sourceHandle: null,
        target: "node-6",
        targetHandle: null,
        id: "reactflow__edge-node-5-node-6",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-3",
        sourceHandle: null,
        target: "node-4",
        targetHandle: null,
        id: "reactflow__edge-node-3-node-4",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-2",
        sourceHandle: null,
        target: "node-3",
        targetHandle: null,
        id: "reactflow__edge-node-2-node-3",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-1",
        sourceHandle: null,
        target: "node-2",
        targetHandle: null,
        id: "reactflow__edge-node-1-node-2",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-2",
        sourceHandle: "option-1",
        target: "node-7",
        targetHandle: null,
        id: "reactflow__edge-node-2option-1-node-7",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-7",
        sourceHandle: "option-0",
        target: "node-8",
        targetHandle: null,
        id: "reactflow__edge-node-7option-0-node-8",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-2",
        sourceHandle: "option-2",
        target: "node-10",
        targetHandle: null,
        id: "reactflow__edge-node-2option-2-node-10",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-2",
        sourceHandle: "option-3",
        target: "node-11",
        targetHandle: null,
        id: "reactflow__edge-node-2option-3-node-11",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-3",
        sourceHandle: "option-1",
        target: "node-4",
        targetHandle: null,
        id: "reactflow__edge-node-3option-1-node-4",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-3",
        sourceHandle: "option-2",
        target: "node-4",
        targetHandle: null,
        id: "reactflow__edge-node-3option-2-node-4",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-10",
        sourceHandle: null,
        target: "node-12",
        targetHandle: null,
        id: "reactflow__edge-node-10-node-12",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-10",
        sourceHandle: "option-1",
        target: "node-12",
        targetHandle: null,
        id: "reactflow__edge-node-10option-1-node-12",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-12",
        sourceHandle: null,
        target: "node-13",
        targetHandle: null,
        id: "reactflow__edge-node-12-node-13",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-13",
        sourceHandle: null,
        target: "node-14",
        targetHandle: null,
        id: "reactflow__edge-node-13-node-14",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-11",
        sourceHandle: "option-0",
        target: "node-15",
        targetHandle: null,
        id: "reactflow__edge-node-11option-0-node-15",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-11",
        sourceHandle: "option-1",
        target: "node-16",
        targetHandle: null,
        id: "reactflow__edge-node-11option-1-node-16",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-15",
        sourceHandle: null,
        target: "node-17",
        targetHandle: null,
        id: "reactflow__edge-node-15-node-17",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-4",
        sourceHandle: "option-1",
        target: "node-18",
        targetHandle: null,
        id: "reactflow__edge-node-4option-1-node-18",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-18",
        sourceHandle: null,
        target: "node-5",
        targetHandle: null,
        id: "reactflow__edge-node-18-node-5",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-8",
        sourceHandle: "option-1",
        target: "node-1740039756818",
        targetHandle: null,
        id: "reactflow__edge-node-8option-1-node-1740039756818",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-1740039756818",
        sourceHandle: null,
        target: "node-6",
        targetHandle: null,
        id: "reactflow__edge-node-1740039756818-node-6",
      },
      {
        animated: true,
        style: {
          stroke: "#2563eb",
          strokeWidth: 2,
        },
        source: "node-8",
        sourceHandle: "option-0",
        target: "node-6",
        targetHandle: null,
        id: "reactflow__edge-node-8option-0-node-6",
      },
    ],
    createdAt: "2025-02-21T10:05:54.186Z",
    updatedAt: "2025-02-21T10:05:54.186Z",
  },
  metadata: {
    exportedAt: "2025-02-21T10:05:54.187Z",
  },
};
