import React, {useCallback} from 'react';
import {ImageBackground, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {getCloudinaryImageUrl} from '../../services/cloudinary.service';
import assets from '../../config/assets';
import HamMenu from '../HamMenu';
import theme from '../../config/theme';

library.add(faArrowLeft);

const HeaderWithImage = ({
                           imageProvider,
                           imageShortName,
                           isOptionsMenu,
                           menus,
                         }) => {

  const navigation = useNavigation();

  const getImageUrl = useCallback(
    () => {
      switch (imageProvider) {
        case 'cloudinary': {
          return getCloudinaryImageUrl({publicId: imageShortName});
        }
        default:
          break;
      }
    },
    []);

  return (
    <ImageBackground
      source={assets.logo.full.grey}
      style={{width: '100%', aspectRatio: 1, backgroundColor: theme.backgroundAndBorders.greyLight}}
    >
      <ImageBackground
        source={{uri: getImageUrl()}}
        style={[style.headerWithImageContainer, style.imageContainer]}
      >
        <View style={style.headerContainer}>
          <TouchableNativeFeedback
            useForeground={true}
            background={TouchableNativeFeedback.Ripple('', true)}
            onPress={() => navigation.goBack()}>
            <View style={style.backButton}>
              <FontAwesomeIcon
                icon={'arrow-left'}
                style={{...style.headerWithImageColor}}
                size={20}
              />
            </View>
          </TouchableNativeFeedback>
          {
            isOptionsMenu &&
            <HamMenu
              buttonColor={'white'}
              menus={menus}
            />
          }
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

HeaderWithImage.propTypes = {
  imageProvider: PropTypes.string,
  imageShortName: PropTypes.string,
  isOptionsMenu: PropTypes.bool,
  menus: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
  })),
};

HeaderWithImage.defaultProps = {
  isOptionsMenu: false,
  menus: [],
};

export default HeaderWithImage;
