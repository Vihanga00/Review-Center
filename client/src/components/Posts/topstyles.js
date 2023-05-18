import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  h1: {
    textAlign: 'center',
    color: '#ffdd94',
    fontSize: '2rem',
    marginTop: '1rem',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    maxWidth: '100%', // Update the maxWidth to 100%
    backgroundColor: '#CCABDB',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
    fontWeight: 'bold',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
    fontWeight: 'bold',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  reviewTitle: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  reviewerName: {
    color: '#888',
    marginBottom: '5px',
  },
  postedAt: {
    color: '#888',
    marginBottom: '5px',
  },
  reviewMessage: {
    marginBottom: '10px',
  },
  totalLikes: {
    color: '#888',
  },
  divider: {
    margin: '10px 0',
    border: 'none',
    borderBottom: '1px solid #ddd',
  },
});

export default useStyles;
