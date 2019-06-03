import React, { Component } from 'react';
import 'emoji-mart/css/emoji-mart.css'
import { fabric } from 'fabric';
import { Smile } from 'react-feather';
import { Picker, Emoji } from 'emoji-mart';
import thumbsUp from './images/thumbs_up.png'
import like_256 from './images/like_256.png'
import like_svg from './images/like.svg'


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();

    this.state = {
      message: '',
      showEmojiPicker: false
    }
  }


  componentDidMount() {
    this.canvas = new fabric.Canvas('c', { backgroundColor: 'yellow' })
    this.setCanvasEventListener()
  }

  setCanvasEventListener() {
    this.canvas.on(
      "object:added", () => {
        this.updateModifications('added')
      })

    this.canvas.on(
      "object:modified", () => {
        this.updateModifications('modified')
      })

    this.canvas.on(
      "object:removed", () => {
        this.updateModifications('removed')
      })

    this.canvas.on(
      "after:render", () => {
        this.updateModifications('after render')
      })
  }

  updateModifications(event) {
    console.log(event)

  }

  onMessageChanged = event => {
    this.setState({ message: event.target.value })
  }

  onEnterPress = (e) => {
    // console.log('onEnterPress')
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      // this.onSendMessage(e);
      const textObject = new fabric.IText('Enter text here...', textOptions);
      textObject.text = this.state.message
      this.updateCanvas(textObject)
      this.setState({ message: '' })
      console.log('send message')
    }
  }

  updateCanvas(textObject) {
    this.canvas.add(textObject).setActiveObject(textObject);
    this.canvas.renderAll()
  }

  toggleEmojiPicker = () => {
    this.setState({ showEmojiPicker: !this.state.showEmojiPicker })
  }

  addEmoji = (emoji) => {
    console.log('add emoji', emoji)

    const text = `${this.state.message}${emoji.native}`;
    this.setState({
      message: text,
      showEmojiPicker: false,
    });
    this.textRef.current.focus()
  }

  addEmoji2 = (emoji) => {
    console.log('add emoji', emoji)

    const text = `${emoji.native}`;
    const textObject = new fabric.IText(text, textOptions);
    this.updateCanvas(textObject)
    this.setState({ showEmojiPicker: false });
    // this.textRef.current.focus()
  }

  fadeOutObject = () => {

    // const circle = new fabric.Circle({ radius: 20, fill: 'red', left: 100, top: 100 });
    // this.canvas.add(circle);
    // this.canvas.setActiveObject(circle);

    const thumbsUp = new fabric.IText(String.fromCodePoint(0x1F44D), praiseOptions);
    this.canvas.add(thumbsUp);
    this.canvas.setActiveObject(thumbsUp);

    let activeObj = this.canvas.getActiveObject();

    // activeObj.setOpacity(1);
    activeObj.set('opacity', 1)

    activeObj.animate('opacity', '0', {
      duration: 1500,
      // onChange: this.canvas.renderAll(),
      onChange: () => this.canvas.requestRenderAll(),
      onComplete: () => {
        this.canvas.getActiveObjects().forEach((obj) => {
          this.canvas.remove(obj)
        });
        // this.canvas.remove(activeObj);
      }
    });
  }

  fadeOutImage = () => {
    fabric.Image.fromURL(like_256, (img) => {
      img.set({
        // width: 600,
        // height: 338,
        left: 100,
        top: 100,
        hasBorders: false,
        hasControls: false
      });
      this.canvas.add(img);
      this.canvas.setActiveObject(img);

      let activeObj = this.canvas.getActiveObject();

      // activeObj.setOpacity(1);
      activeObj.set('opacity', 1)

      activeObj.animate('opacity', '0', {
        duration: 1500,
        // onChange: this.canvas.renderAll(),
        onChange: () => this.canvas.requestRenderAll(),
        onComplete: () => {
          this.canvas.getActiveObjects().forEach((obj) => {
            this.canvas.remove(obj)
          });
          // this.canvas.remove(activeObj);
        }
      });
    });
  }

  fadeOutSVG = () => {
    fabric.loadSVGFromURL(like_svg, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      svg.left = 200;
      svg.top = 150;
      svg.scaleToWidth(180);
      svg.scaleToHeight(180);
      svg.hasBorders = false;
      svg.hasControls = false;
      this.canvas.add(svg);
      // let group = [];
      // const loadedObjects = new fabric.Group(group);

      // loadedObjects.set({
      //   left: 100,
      //   top: 100,
      //   width: 175,
      //   height: 175
      // });

      // this.canvas.add(loadedObjects);

      this.canvas.setActiveObject(svg);

      let activeObj = this.canvas.getActiveObject();

      // activeObj.setOpacity(1);
      activeObj.set('opacity', 1)

      activeObj.animate('opacity', '0', {
        duration: 1500,
        // onChange: this.canvas.renderAll(),
        onChange: () => this.canvas.requestRenderAll(),
        onComplete: () => {
          this.canvas.getActiveObjects().forEach((obj) => {
            this.canvas.remove(obj)
          });
          // this.canvas.remove(activeObj);
        }
      });
      // this.canvas.renderAll();
    });
  }

  render() {
    return (
      <div>
        <div>
          <Emoji emoji='+1' set='apple' size={60} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <canvas id="c" width="900px" height="500px"></canvas>
        </div>
        <div>
          {
            this.state.showEmojiPicker ?
              (
                <Picker
                  onSelect={this.addEmoji2}
                  showPreview={false}
                  showSkinTones={false}
                  native={true}
                  emoji='point_up'
                />
              ) : null
          }
        </div>
        <div style={{ border: 'all', borderRadius: '5px', borderColor: '#bsbsbs', borderWidth: '2px' }}>
          <textarea
            ref={this.textRef}
            className=""
            style={{ border: 'none', height: '100px', outlineStyle: 'none', paddingRight: '10%', width: '300px', marginTop: '50px', fontFamily: 'inherit', fontSize: '25px' }} onKeyDown={this.onEnterPress}
            autoFocus
            placeholder="Type your message..."
            value={this.state.message}
            onChange={this.onMessageChanged}
          />
          <span>
            <button
              type="button"
              onClick={this.toggleEmojiPicker}
            >
              <Smile />
            </button>

            <button
              type="button"
              onClick={this.fadeOutObject}
            >
              Fade
            </button>

            <button
              type="button"
              onClick={this.fadeOutImage}
            >
              Image
            </button>

            <button
              type="button"
              onClick={this.fadeOutSVG}
            >
              SVG
            </button>
          </span>
        </div>

      </div>
    );
  }
}

export default Canvas;

const textOptions = {
  fontFamily: 'Helvetica',
  fontSize: 150,
  fontWeight: 'bold',
  fill: 'blue',
  left: 300,
  top: 100,
  radius: 10,
  borderRadius: '25px',
  hasRotatingPoint: true
};

const praiseOptions = {
  fontFamily: 'Helvetica',
  fontSize: 250,
  fontWeight: 'bold',
  hasBorders: false,
  hasControls: false,
  fill: 'blue',
  left: 100,
  top: 100,
  radius: 10,
  borderRadius: '25px'
};