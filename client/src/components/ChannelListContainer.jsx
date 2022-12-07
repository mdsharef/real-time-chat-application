import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview} from './';

import FriendsAddaIcon from '../assets/friendsadda.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={FriendsAddaIcon} alt="FriendsAdda" width='30px' />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width='30px' />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>Friends' Adda</p>
    </div>
)

const customChannelTeamFilterFun = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilterFun = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove('userId');
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    const filters = { members: {$in: [client.userID]} }

  return (
    <>
        <SideBar logout={logout} />
        <div className='channel-list__list__wrapper'>
            <CompanyHeader />
            <ChannelSearch 
                setToggleContainer={setToggleContainer}
            />
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelTeamFilterFun}
                List= {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type='team'
                        isCreating={isCreating}                               
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setCreateType={setCreateType}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview= {(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type='team'
                    />
                )}
            />
            <ChannelList 
                filters={filters}
                channelRenderFilterFn={customChannelMessagingFilterFun}
                List= {(listProps) => (
                    <TeamChannelList 
                        {...listProps}
                        type='messaging'
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setCreateType={setCreateType}
                        setToggleContainer={setToggleContainer}
                    />
                )}
                Preview= {(previewProps) => (
                    <TeamChannelPreview 
                        {...previewProps}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                        type='messaging'
                    />
                )}
            />
        </div>
    </>
  )
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className='channel-list__container'>
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
            </div>

            <div className='channel-list__container-responsive'
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer