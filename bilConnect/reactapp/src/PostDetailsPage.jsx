import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

const DetailedPostPage = ({ posts }) => {
    const { id } = useParams();
    const post = posts.find((post) => post.id.toString() === id);

    if (!post) {
        return (
            <Container maxWidth="xl" sx={{ marginTop: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                    Post not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 4, textAlign: 'center' }}>
            <Box
                sx={{
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'left',
                    backgroundColor: '#252525', // Dark background color
                    color: '#ffffff', // White text color
                }}
            >
                <Typography variant="h3" color="primary" gutterBottom>
                    {post.title}
                </Typography>
                <img
                    src={post.image}
                    alt={post.title}
                    style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', margin: 'auto' }}
                />
                <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                    {post.price}
                </Typography>
                {post.description && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        {post.description}
                    </Typography>
                )}
                {post.quota && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Quota: {post.quota}
                    </Typography>
                )}
                {post.traveltime && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Travel Time: {post.traveltime}
                    </Typography>
                )}
                {post.destination && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Destination: {post.destination}
                    </Typography>
                )}
                {post.origin && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Origin: {post.origin}
                    </Typography>
                )}
                {post.isfullyvaccinated !== undefined && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Fully Vaccinated: {post.isfullyvaccinated ? 'Yes' : 'No'}
                    </Typography>
                )}
                {post.ageinmonths && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Age in Months: {post.ageinmonths}
                    </Typography>
                )}
                {post.place && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Place: {post.place}
                    </Typography>
                )}
                {post.returndate && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Return Date: {post.returndate}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default DetailedPostPage;
