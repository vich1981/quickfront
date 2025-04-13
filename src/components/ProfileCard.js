import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import Input from './Input';
import ButtonWithProgress from './ButtonWithProgress';

const ProfileCard = (props) => {
    const { role, email, location, username, image } = props.user;

    const showEditButton = props.isEditable && !props.inEditMode;

    return (
        <div className="card">
            <div className="card-header text-center">
                <ProfileImageWithDefault
                    alt="profile" 
                    width="200" 
                    height="200" 
                    image={image}
                    src={props.loadedImage}
                    className="rounded-circle shadow"
                />
            </div>
            <div className="card-body text-center">
                {!props.inEditMode && (
                    <div>
                        <h4>{`${username}(${role})`}</h4>
                        <h4>{`${email}`}</h4>
                        <h4>{`${location}`}</h4>
                    </div>
                )}
                {props.inEditMode && (
                    <div className="mb-2">
                        <div className = "text-start mt-2">
                            <Input 
                                value={username} 
                                label={`Изменить имя для ${email}`}
                                onChange={props.onChangeUsername}
                                hasError={props.errors.username && true}
                                error={props.errors.username}
                            />
                        </div>
                        <div className = "text-start mt-2">
                            <Input 
                                value={location} 
                                label={`Изменить расположение для ${email}`}
                                onChange={props.onChangeLocation}
                                hasError={props.errors.location && true}
                                error={props.errors.location}
                            />
                        </div>
                        <div className = "text-start mt-2">
                            <Input 
                                type="file"
                                onChange={props.onFileSelect}
                                hasError={props.errors.image && true}
                                error={props.errors.image}
                            />
                        </div>
                    </div>
                )}
                {showEditButton && (
                    <button 
                        className="btn btn-outline-success" 
                        onClick={props.onClickEdit}
                    >
                        <i className="fas fa-user-edit" /> Edit
                    </button>
                )}
                {props.inEditMode && (
                    <div>
                        <ButtonWithProgress 
                            className="btn btn-primary"
                            onClick={props.onClickSave}
                            text={<span>
                                <i className="fas fa-save" /> Save
                            </span>}
                            pendingApiCall={props.pendingUpdateCall}
                            disabled={props.pendingUpdateCall}
                        />
                        <button 
                            className="btn btn-outline-secondary m-1"
                            onClick={props.onClickCancel}
                            disabled={props.pendingUpdateCall}
                        >
                            <i className="fas fa-window-close" /> Cancel
                        </button>
                    </div>
                )}
            </div>
            
        </div>
    );
};

ProfileCard.defaultProps = {
    errors: {}
};

export default ProfileCard;