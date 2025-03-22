[
  {
    $match: {
      product: new ObjectId("67de9c2a89a3857e1fabefa7"),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: "$rating",
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];
