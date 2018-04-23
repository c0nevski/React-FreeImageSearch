import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export class ImageResults extends Component {
  state = { open: false, currentImage: '' };

  handleOpen = img => {
    this.setState({ open: true, currentImage: img });
  };

  handleClose = () => {
    this.setState({ open: false, currentImage: null });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(singleImage => (
            <GridTile
              title={singleImage.tags}
              key={singleImage.id}
              subtitle={
                <span>
                  by: <strong>{singleImage.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton
                  onClick={() => this.handleOpen(singleImage.largeImageURL)}
                >
                  <ZoomIn color="white" />
                </IconButton>
              }
            >
              <img src={singleImage.largeImageURL} alt={singleImage.tags} />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImage} alt="" style={{ width: '100%' }} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
