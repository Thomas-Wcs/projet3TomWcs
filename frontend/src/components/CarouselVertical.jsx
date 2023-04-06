import React from "react";
import { Carousel } from "react-material-ui-carousel";
import PropTypes from "prop-types";
import { Paper, Button } from "@mui/material";

function CarouselVertical() {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #3",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #4",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  const { name, description } = item;
  return (
    <Paper style={{ width: "300px", height: "500px" }}>
      <h2>{name}</h2>
      <p>{description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarouselVertical;
