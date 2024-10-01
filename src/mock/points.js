import { getRandomArrayElement } from '../utils.js';

const Points = [
  {
    'id': '7594223c-c977-4e29-98c1-3e874184ce7b',
    'basePrice': 8325,
    'dateFrom': '2024-09-27T22:01:09.952Z',
    'dateTo': '2024-09-29T15:49:09.952Z',
    'destination': '3863e6c2-e62e-4dca-935a-b40ca780180b',
    'isFavorite': true,
    'offers': [
      '461eac96-a50e-484b-84ab-c120da90c021',
      '0c922f03-4dc0-4fd3-b795-e4fd944707d8',
      '3a03c395-c373-45f5-80db-305737047680',
      '66d15808-5a60-4dcf-a3ea-ecc431981d3a',
      '17ea81f9-febb-4d87-921b-4497fb7b2d8b'
    ],
    'type': 'check-in'
  },
  {
    'id': 'e8bd323c-bc4d-476e-a025-1c2b84b270d8',
    'basePrice': 3825,
    'dateFrom': '2024-09-30T02:46:09.952Z',
    'dateTo': '2024-10-01T08:26:09.952Z',
    'destination': '085cb853-3a05-413a-a9c6-bd4e3fc3f21f',
    'isFavorite': true,
    'offers': [
      '6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86',
      '1cee50cd-1bd5-4478-86a2-7a24daf8569b'
    ],
    'type': 'flight'
  },
  {
    'id': '47fabaf0-2c9a-444a-b3b0-57500c28330b',
    'basePrice': 7283,
    'dateFrom': '2024-10-02T15:04:09.952Z',
    'dateTo': '2024-10-03T03:15:09.952Z',
    'destination': '8dc2a6e7-f41e-4814-91b3-595a757d35e6',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'e88e8560-1ca6-4ff3-aee4-3019ca224ced',
    'basePrice': 4552,
    'dateFrom': '2024-10-04T11:08:09.952Z',
    'dateTo': '2024-10-06T09:05:09.952Z',
    'destination': '8dc2a6e7-f41e-4814-91b3-595a757d35e6',
    'isFavorite': true,
    'offers': [
      '600abbe0-fab9-484a-81de-6463770115c3'
    ],
    'type': 'ship'
  },
  {
    'id': 'e02d2fc0-b125-487f-8d6f-ec25af57a0c2',
    'basePrice': 4413,
    'dateFrom': '2024-10-08T03:27:09.952Z',
    'dateTo': '2024-10-09T06:06:09.952Z',
    'destination': '085cb853-3a05-413a-a9c6-bd4e3fc3f21f',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '64ca2f55-68f6-4c57-9df1-9ac73b8da7ee',
    'basePrice': 4504,
    'dateFrom': '2024-10-10T12:53:09.952Z',
    'dateTo': '2024-10-11T05:27:09.952Z',
    'destination': '0f076d37-07ca-4bd2-9405-1db9d63555df',
    'isFavorite': false,
    'offers': [],
    'type': 'ship'
  },
  {
    'id': 'f80cafbc-b737-479e-9a0b-607038d955c5',
    'basePrice': 5984,
    'dateFrom': '2024-10-11T13:25:09.952Z',
    'dateTo': '2024-10-13T07:02:09.952Z',
    'destination': '0f076d37-07ca-4bd2-9405-1db9d63555df',
    'isFavorite': true,
    'offers': [
      '3e6497ae-795a-4ed9-911f-d04b87e46466',
      '545bd287-cabc-4144-a451-6320fc9812c9'
    ],
    'type': 'drive'
  },
  {
    'id': '92d64d4c-303f-47ee-9116-87e165fb9d26',
    'basePrice': 9293,
    'dateFrom': '2024-10-15T02:46:09.952Z',
    'dateTo': '2024-10-15T09:01:09.952Z',
    'destination': '2184d59b-7448-4f1b-bc2a-87ca1b5d25f6',
    'isFavorite': true,
    'offers': [
      '7fefcce6-0052-4bad-bdb0-3a2ec3d06577',
      'ef4e353b-1321-4f3e-82f5-8b01e60dde18',
      '1f85122d-99c8-4263-8358-bfc474cccc78',
      '74a22452-6155-4edc-a4f1-bc35c0fb08ba',
      '600abbe0-fab9-484a-81de-6463770115c3'
    ],
    'type': 'ship'
  },
  {
    'id': '4764ed35-02cf-4ed2-a07a-4c74dbc4ef1c',
    'basePrice': 868,
    'dateFrom': '2024-10-17T03:44:09.952Z',
    'dateTo': '2024-10-18T13:03:09.952Z',
    'destination': '63210beb-c938-483a-9f84-aa7ca8637320',
    'isFavorite': true,
    'offers': [
      '4be2bb22-3992-470f-b0b1-84cd7b1cc0fe',
      'b8265f2c-d1be-4434-b634-14f59db3d923',
      '18d62c22-e8b3-4b63-be10-4c3f108b8e8b'
    ],
    'type': 'bus'
  },
  {
    'id': '0446ef78-fc04-4ea6-a750-d50b91409d6f',
    'basePrice': 6291,
    'dateFrom': '2024-10-19T00:52:09.952Z',
    'dateTo': '2024-10-19T17:27:09.952Z',
    'destination': '085cb853-3a05-413a-a9c6-bd4e3fc3f21f',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  }
];

const getRandomPoints = () => getRandomArrayElement(Points);

export {getRandomPoints};
