import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag, updateTag } from '../../actions/tag';

import {
  Button,
  Modal,
  TextContainer,
  ButtonGroup,
  Card,
  Form,
  FormLayout,
  Stack,
  TextField,
  SettingToggle,
  TextStyle,
  Layout
} from '@shopify/polaris';


const Tag = (props) => {
    console.log('props in Tag.js component: ',props);

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    //tag modal
    const [active, setActive] = useState(false);
    const [tag, setTag] = useState('');

    const handleModalChange = useCallback(() => setActive(!active), [active]);

    const handleTagChange = useCallback((value) => {
          setTag(value)
          setValues({ ...values, tagName: value });
          console.log('ran handleTagChange func with value: ', value);
    }, []);

    const submitNewTag = () =>{
        console.log('tag in handleSubmit func',tag)
        console.log('values.tagName in handleSubmit func',values.tagName);

        updateTag({newTagName: tag, props, token}).then(data => {
            if(data){
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    props.handleTagUpdate({ ...props.values, tags: props.values.tags.push(data)})
                    setValues({ error: '', success: `Tag updated successfully` });
                }
            }
           
        });
        setActive(false);
      };

    const { name, error, success, tags, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags(props).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showTags = (props) => {
        // console.log('props in ShowTags function', props);

        // return tags.map((t, i) => {
        //     return (
        //         <Button key={i}
        //             onDoubleClick={() => deleteConfirm(t.slug)}
        //             primary 
        //             external={true}>
        //                {t.name}  
        //         </Button>
        //     );
        // });
        return tags.map((t, i) => {
            return (
                <React.Fragment>
                <Button primary onClick={handleModalChange}>{t.name}</Button>
                  <Modal
                    open={active}
                    onClose={handleModalChange}
                    title={`Edit Tag`}
                    primaryAction={{
                      content: 'Update',
                      onAction: ()=>submitNewTag(),
                    }}
                    secondaryActions={[
                      {
                        content: 'Cancel',
                        onAction: handleModalChange,
                      },
                    ]}
                  >
                    <Modal.Section>
                      <TextContainer>
                        <p>
                             Tag name
                        </p>
                          <FormLayout>
                            <TextField
                              value={t.name}
                              onChange={handleTagChange}
                              label=""
                              type="text"
                              helpText={
                                <span>
                                   This is the tag name that will appear within your Social Network.
                                </span>
                              }
                            />
                          </FormLayout>
                      </TextContainer>
                    </Modal.Section>
                  </Modal>
                </React.Fragment>
                )})
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete this tag?');
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        // console.log('delete', slug);
        removeTag(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const clickSubmit = e => {
        console.log('ran clickSubmit function');
        e.preventDefault();
        // console.log('create category', name);
        create({ name }, props, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const showSuccess = () => {
        if (success) {
            return <p className="text-success">Tag is created</p>;
        }
    };

    const showError = () => {
        if (error) {
            return <p className="text-danger">Tag already exist</p>;
        }
    };

    const showRemoved = () => {
        if (removed) {
            return <p className="text-danger">Tag is removed</p>;
        }
    };

    const mouseMoveHandler = e => {
        setValues({ ...values, error: false, success: false, removed: '' });
    };

    const newTagFom = () => (
        <Form onSubmit={clickSubmit}>
             <FormLayout>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" onChange={handleChange} value={name} required />
                    <Button submit={true}>
                        Create
                    </Button>
                </div>
             </FormLayout>
        </Form>
    );

    return (
        <React.Fragment>
            <Layout.AnnotatedSection
                title="Manage Tags"
                description="Create new tags which will be featured in your Social Network."
              >
                <div onMouseMove={mouseMoveHandler}>
                    {newTagFom()}
                    <ButtonGroup >
                        {showTags(props)}
                    </ButtonGroup>
                    
                </div>
            </Layout.AnnotatedSection>
        </React.Fragment>
    );
};

export default Tag;