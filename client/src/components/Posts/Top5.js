import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Grid, Typography, Button, Container } from '@material-ui/core';
import { getTopPosts } from '../../actions/getTopPosts';
import useStyles from './topstyles';
import jsPDF from 'jspdf';

const MESSAGE_MAX_LENGTH = 450; // Adjust the maximum length as per your requirement

const Top5 = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const sortedPosts = [...posts].sort((a, b) => b.likeCount - a.likeCount);
  const classes = useStyles();
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(getTopPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress />
      </Grid>
    );
  }

  const truncateText = (text) => {
    if (text.length <= MESSAGE_MAX_LENGTH) {
      return text;
    }
    return `${text.substring(0, MESSAGE_MAX_LENGTH)}...`;
  };

  const handleDownload = () => {
    const pdf = new jsPDF();
  
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    const leftMargin = 20;
    const rightMargin = pageWidth - leftMargin;
    const topMargin = 20;
    const bottomMargin = pageHeight - topMargin;
  
    let yPos = topMargin;
  
    // Add heading
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Best 5 Experiences of TourGenie baised on the Reviews', leftMargin, yPos);
    yPos += 15;
  
    sortedPosts.forEach((post, index) => {
      if (index !== 0) {
        yPos += 10;
      }
  
      const { title, name, createdAt, likeCount } = post;
  
      // Add border and background color to the post container
      pdf.setFillColor(230);
      pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 40, 'F');
  
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
  
      // Add border and background color to the review title
      pdf.setFillColor(200);
      pdf.rect(leftMargin, yPos, rightMargin - leftMargin, 10, 'F');
  
      // Add review title text
      pdf.setTextColor(255);
      pdf.text(`${index + 1}. Review Title: ${title}`, leftMargin + 2, yPos + 8);
  
      pdf.setFontSize(12);
      pdf.setTextColor(0);
  
      // Add review details
      pdf.text(`Review posted by: ${name}`, leftMargin + 5, yPos + 20);
      pdf.text(`Review posted at: ${createdAt.substring(0, 10)}`, leftMargin + 5, yPos + 30);
      pdf.text(`Total Likes: ${likeCount}`, leftMargin + 5, yPos + 40);
  
      yPos += 50;
  
      if (yPos + 30 > bottomMargin) {
        pdf.addPage();
        yPos = topMargin;
      }
    });
  
    pdf.save('top_posts.pdf');
  };
  
  
  
  
  

  return (
    <Container maxWidth="st">
      <h1>Best 5 Experiences to have with TourGenie according to the Customer Reviews</h1>

      <Button variant="contained" color="primary" onClick={handleDownload}>
        Download as PDF
      </Button>

      {sortedPosts.map((post, index) => (
        <div key={post._id} className={classes.postContainer}>
          {index > 0 && <hr className={classes.divider} />}
          <Typography variant="h5" component="h2" className={classes.reviewTitle}>
            {index + 1}. Review Title: {post.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" className={classes.reviewerName}>
            Review posted by: {post.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.postedAt}>
            Review posted at: {post.createdAt.substring(0, 10)}
          </Typography>
          <Typography variant="body2" component="p" className={classes.reviewMessage}>
            Review Message: {truncateText(post.message)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" className={classes.totalLikes}>
            Total Likes: {post.likeCount}
</Typography>
</div>
))}
</Container>
);

};

export default Top5;
