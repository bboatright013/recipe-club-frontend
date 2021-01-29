import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Badge
  } from 'reactstrap';


const RecipeCard = ({id, recipe_name, image_url, created_on, user_username, num_comments, rating, cookbook_adds}) => {



return (
    <Card data-id={id} className="RecipeCard">
        <Link to={`/recipes/${id}`}>
            <CardImg top width="100%" src={image_url} alt={`image of ${recipe_name}`}/>
        </Link>
        <CardBody>
        <CardTitle tag="h5" className="CardName">{recipe_name}</CardTitle>
        <Badge outline color="primary" className="CardRating">User Rating: {Math.trunc(rating)}</Badge>
        <Badge outline color="primary" className="CardCookbooks">Cookbook Adds: {cookbook_adds}</Badge>
        <Badge outline color="primary" className="CardComments">Comments: {num_comments}</Badge>
        <CardSubtitle tag="h6" className="CardCreatedOn">{created_on}</CardSubtitle>
        <CardSubtitle tag="h6" className="CardUsername">{user_username}</CardSubtitle>
        </CardBody>
    </Card>
)

}

export default RecipeCard;