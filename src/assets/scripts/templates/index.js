import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/templates/index.scss';
import '../theme';
import Collection from './collection';

const root = document.getElementById('content-for-layout');

// console.log('We are connected!');


// Render my component for the collection
ReactDOM.render(
  <Collection />,
  root
);
