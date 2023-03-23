import React, { useState } from 'react';
import { Input, Tag } from 'antd';
import axios from 'axios';
import { Http } from '../../../api/http'

const { Search } = Input;

const HashtagInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [hashtags, setHashtags] = useState([]);

    const onSearch = async (value) => {
        if (value && value.trim() !== '') {
            const newHashtags = value.split(' ').filter((tag) => tag.startsWith('@'));
            setHashtags(newHashtags);
        } else {
            setHashtags([]);
        }
        try {
            const hashtags = value.match(/@(\w+)/g);
            if (!hashtags) return;
            for (let hashtag of hashtags) {
                hashtag = hashtag.substring(1);
                await Http.post('/api/v1/hastag', { name: hashtag });
            }
            // setInputValue('');
        } catch (err) {
            console.error(err);
        }
    };

    // const handleInputChange = (e) => {
    //     const value = e.target.value;
    //     if (value && value.trim() !== '') {
    //         const newHashtags = value.split(' ').filter((tag) => tag.startsWith('@'));
    //         setHashtags(newHashtags);
    //     } else {
    //         setHashtags([]);
    //     }
    // };

    return (
        <>
            <Search
                value={inputValue}
                placeholder="Enter Hastag starting with '@' "
                enterButton="Add hastag"
                size="large"
                onChange={(e) => setInputValue(e.target.value)}
                onSearch={onSearch}
                style={{ marginBottom: '24px' }}
            />
            {hashtags.length > 0 && (
                <div>
                    {hashtags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            )}
        </>
    );
};

export default HashtagInput;
