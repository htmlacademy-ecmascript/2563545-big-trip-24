const Offers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '41377056-069d-44d0-97f8-605503c74807',
        'title': 'Upgrade to a business class',
        'price': 77
      },
      {
        'id': 'fc6134f5-f9b0-4f25-be74-52f5eba11d9b',
        'title': 'Choose the radio station',
        'price': 43
      },
      {
        'id': '093af844-6c49-4bf9-a25c-c762f70a50d3',
        'title': 'Choose temperature',
        'price': 130
      },
      {
        'id': '925d1645-a99e-42c5-8953-e574f382abdb',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 52
      },
      {
        'id': '9dc6e213-ed65-4c42-be21-402ef345145e',
        'title': 'Drive slowly',
        'price': 158
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '4be2bb22-3992-470f-b0b1-84cd7b1cc0fe',
        'title': 'Infotainment system',
        'price': 76
      },
      {
        'id': 'b8265f2c-d1be-4434-b634-14f59db3d923',
        'title': 'Order meal',
        'price': 147
      },
      {
        'id': '18d62c22-e8b3-4b63-be10-4c3f108b8e8b',
        'title': 'Choose seats',
        'price': 167
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 'e18f4b94-239f-4035-986d-efc226fb0205',
        'title': 'Book a taxi at the arrival point',
        'price': 103
      },
      {
        'id': '69aa9230-3137-4575-9aec-5ded92245aa9',
        'title': 'Order a breakfast',
        'price': 155
      },
      {
        'id': '8ee8ba3b-362e-43ee-acbd-636b1ce931cc',
        'title': 'Wake up at a certain time',
        'price': 100
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '77ca6b05-22ac-4693-bf9d-241eeca0893b',
        'title': 'Choose meal',
        'price': 134
      },
      {
        'id': '7de07865-8246-493d-aff6-65294b75fb03',
        'title': 'Choose seats',
        'price': 78
      },
      {
        'id': '01ff0c0a-c802-456b-9af6-bdc8c0c1af08',
        'title': 'Upgrade to comfort class',
        'price': 72
      },
      {
        'id': 'd916db22-6f4b-41d2-9eec-badb4b2f3fa0',
        'title': 'Upgrade to business class',
        'price': 126
      },
      {
        'id': '6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86',
        'title': 'Add luggage',
        'price': 162
      },
      {
        'id': '1cee50cd-1bd5-4478-86a2-7a24daf8569b',
        'title': 'Business lounge',
        'price': 124
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '461eac96-a50e-484b-84ab-c120da90c021',
        'title': 'Choose the time of check-in',
        'price': 127
      },
      {
        'id': '0c922f03-4dc0-4fd3-b795-e4fd944707d8',
        'title': 'Choose the time of check-out',
        'price': 61
      },
      {
        'id': '3a03c395-c373-45f5-80db-305737047680',
        'title': 'Add breakfast',
        'price': 186
      },
      {
        'id': '66d15808-5a60-4dcf-a3ea-ecc431981d3a',
        'title': 'Laundry',
        'price': 85
      },
      {
        'id': '17ea81f9-febb-4d87-921b-4497fb7b2d8b',
        'title': 'Order a meal from the restaurant',
        'price': 36
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'a46e3b48-1fd0-4c4e-b9fa-cd0423665872',
        'title': 'Choose meal',
        'price': 58
      },
      {
        'id': '7fefcce6-0052-4bad-bdb0-3a2ec3d06577',
        'title': 'Choose seats',
        'price': 107
      },
      {
        'id': 'ef4e353b-1321-4f3e-82f5-8b01e60dde18',
        'title': 'Upgrade to comfort class',
        'price': 156
      },
      {
        'id': '1f85122d-99c8-4263-8358-bfc474cccc78',
        'title': 'Upgrade to business class',
        'price': 122
      },
      {
        'id': '74a22452-6155-4edc-a4f1-bc35c0fb08ba',
        'title': 'Add luggage',
        'price': 44
      },
      {
        'id': '600abbe0-fab9-484a-81de-6463770115c3',
        'title': 'Business lounge',
        'price': 197
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '3e6497ae-795a-4ed9-911f-d04b87e46466',
        'title': 'With automatic transmission',
        'price': 116
      },
      {
        'id': '545bd287-cabc-4144-a451-6320fc9812c9',
        'title': 'With air conditioning',
        'price': 145
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '9f24f136-bb4a-4c12-a141-b5f2219fbbbe',
        'title': 'Choose live music',
        'price': 36
      },
      {
        'id': '8acf0435-dde2-4542-a186-d59cc6d26e9c',
        'title': 'Choose VIP area',
        'price': 131
      }
    ]
  }
];

const getOffers = () => Offers;

export { getOffers };
