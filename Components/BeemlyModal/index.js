import React from 'react';
import {
	Modal, View, TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const BeemlyModal = ({
	visible, close, style, children,
}) => (
	<Modal
		animationType="fade"
		visible={visible}
		transparent
		hardwareAccelerated
		onRequestClose={close}
	>
		<View style={{
			position: 'absolute', height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)',
		}}
		/>
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			enabled
		>
			<TouchableWithoutFeedback
				onPress={close}
			>
				<View
					style={styles.container}
					behavior="height"
					enabled
				>
					<TouchableWithoutFeedback
						onPress={() => {}}
					>
						<View
							style={{ ...styles.modal, ...style }}
						>
							{children}
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	</Modal>
);

BeemlyModal.propTypes = {
	visible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	style: PropTypes.object,
	children: PropTypes.array.isRequired,
};

BeemlyModal.defaultProps = {
	style: {},
};

export default BeemlyModal;
