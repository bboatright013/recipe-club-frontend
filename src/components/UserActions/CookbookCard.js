import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

const CookbookCard = ({username, id, recipe_name, image_url, created_on, user_username}) => {



return (
    <Card data-id={id} className="RecipeCard">
        <Link to={`/cookbook/${id}`}>
            <CardImg top width="100%" src={image_url}/>
        </Link>
        <CardTitle tag="h5" className="CookbookCardName">{recipe_name}</CardTitle>

        <CardSubtitle tag="h6" className="CookbookCardCreatedOn">{created_on}</CardSubtitle>
        <CardSubtitle tag="h6" className="CookbookCardUsername">{user_username}</CardSubtitle>
    </Card>
)

}

export default CookbookCard;