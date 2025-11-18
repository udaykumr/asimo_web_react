import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('featured')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState('')

  const dataFiles = {
    featured: '/data/featured.json',
    events: '/data/events.json',
    workshops: '/data/workshops.json',
    gallery: '/data/gallery.json',
    members: '/data/members.json',
    notifications: '/data/notifications.json',
    about: '/data/about.json'
  }

  useEffect(() => {
    loadData(activeTab)
  }, [activeTab])

  const loadData = async (tab) => {
    setLoading(true)
    try {
      const response = await fetch(dataFiles[tab])
      const jsonData = await response.json()
      setData(jsonData)
      setLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setLoading(false)
    }
  }

  const handleSave = () => {
    // Convert data to JSON string for download
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${activeTab}.json`
    link.click()
    URL.revokeObjectURL(url)
    
    setSaveStatus('Downloaded! Replace the file in /public/data/ folder')
    setTimeout(() => setSaveStatus(''), 5000)
  }

  const updateArrayItem = (path, index, field, value) => {
    const newData = JSON.parse(JSON.stringify(data))
    const keys = path.split('.')
    let current = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    const arrayKey = keys[keys.length - 1]
    current[arrayKey][index][field] = value
    setData(newData)
  }

  const addArrayItem = (path, template) => {
    const newData = JSON.parse(JSON.stringify(data))
    const keys = path.split('.')
    let current = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    const arrayKey = keys[keys.length - 1]
    current[arrayKey].push(template)
    setData(newData)
  }

  const deleteArrayItem = (path, index) => {
    const newData = JSON.parse(JSON.stringify(data))
    const keys = path.split('.')
    let current = newData
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    
    const arrayKey = keys[keys.length - 1]
    current[arrayKey].splice(index, 1)
    setData(newData)
  }

  const renderFeaturedEditor = () => {
    if (!data.featuredBanners) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Featured Banners</h3>
          <button 
            className="btn-add"
            onClick={() => addArrayItem('featuredBanners', {
              id: `banner-${Date.now()}`,
              title: 'New Banner',
              subtitle: 'Subtitle',
              description: 'Description',
              image: 'assets/images/featured/placeholder.png',
              buttonText: 'Click Here',
              buttonLink: '#',
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              order: data.featuredBanners.length + 1
            })}
          >
            + Add Banner
          </button>
        </div>
        
        {data.featuredBanners.map((banner, index) => (
          <div key={index} className="editor-card">
            <div className="card-header">
              <h4>Banner {index + 1}</h4>
              <button 
                className="btn-delete"
                onClick={() => deleteArrayItem('featuredBanners', index)}
              >
                Delete
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={banner.title}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Subtitle</label>
                <input 
                  type="text" 
                  value={banner.subtitle}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'subtitle', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Description</label>
                <textarea 
                  value={banner.description}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'description', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="form-field">
                <label>Image Path</label>
                <input 
                  type="text" 
                  value={banner.image}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'image', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Button Text</label>
                <input 
                  type="text" 
                  value={banner.buttonText}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'buttonText', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Button Link</label>
                <input 
                  type="text" 
                  value={banner.buttonLink}
                  onChange={(e) => updateArrayItem('featuredBanners', index, 'buttonLink', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderEventsEditor = () => {
    if (!data.events) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Events</h3>
          <button 
            className="btn-add"
            onClick={() => addArrayItem('events', {
              title: 'New Event',
              date: new Date().toLocaleDateString(),
              description: 'Event description',
              image: 'assets/images/events/placeholder.png',
              participants: '0',
              duration: '1 day'
            })}
          >
            + Add Event
          </button>
        </div>
        
        {data.events.map((event, index) => (
          <div key={index} className="editor-card">
            <div className="card-header">
              <h4>{event.title}</h4>
              <button 
                className="btn-delete"
                onClick={() => deleteArrayItem('events', index)}
              >
                Delete
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={event.title}
                  onChange={(e) => updateArrayItem('events', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Date</label>
                <input 
                  type="text" 
                  value={event.date}
                  onChange={(e) => updateArrayItem('events', index, 'date', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Description</label>
                <textarea 
                  value={event.description}
                  onChange={(e) => updateArrayItem('events', index, 'description', e.target.value)}
                  rows="3"
                />
              </div>
              <div className="form-field">
                <label>Image Path</label>
                <input 
                  type="text" 
                  value={event.image || ''}
                  onChange={(e) => updateArrayItem('events', index, 'image', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Participants</label>
                <input 
                  type="text" 
                  value={event.participants || ''}
                  onChange={(e) => updateArrayItem('events', index, 'participants', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Duration</label>
                <input 
                  type="text" 
                  value={event.duration || ''}
                  onChange={(e) => updateArrayItem('events', index, 'duration', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderNotificationsEditor = () => {
    if (!data.notifications) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Notifications</h3>
          <button 
            className="btn-add"
            onClick={() => addArrayItem('notifications', {
              id: Date.now(),
              title: 'New Notification',
              message: 'Notification message',
              timestamp: new Date().toISOString(),
              read: false
            })}
          >
            + Add Notification
          </button>
        </div>
        
        {data.notifications.map((notif, index) => (
          <div key={index} className="editor-card">
            <div className="card-header">
              <h4>{notif.title}</h4>
              <button 
                className="btn-delete"
                onClick={() => deleteArrayItem('notifications', index)}
              >
                Delete
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={notif.title}
                  onChange={(e) => updateArrayItem('notifications', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Message</label>
                <textarea 
                  value={notif.message}
                  onChange={(e) => updateArrayItem('notifications', index, 'message', e.target.value)}
                  rows="3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handleImageUpload = (path, index, field, event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // Store base64 image temporarily
        updateArrayItem(path, index, field + '_upload', e.target.result)
        // Keep the original path field for reference
        updateArrayItem(path, index, field, `uploaded_${file.name}`)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderGalleryEditor = () => {
    if (!data.gallery) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Gallery</h3>
          <button 
            className="btn-add"
            onClick={() => addArrayItem('gallery', {
              title: 'New Image',
              image: 'assets/images/gallery/placeholder.png'
            })}
          >
            + Add Image
          </button>
        </div>
        
        {data.gallery.map((item, index) => (
          <div key={index} className="editor-card">
            <div className="card-header">
              <h4>{item.title}</h4>
              <button 
                className="btn-delete"
                onClick={() => deleteArrayItem('gallery', index)}
              >
                Delete
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={item.title}
                  onChange={(e) => updateArrayItem('gallery', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Image Path</label>
                <input 
                  type="text" 
                  value={item.image}
                  onChange={(e) => updateArrayItem('gallery', index, 'image', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Upload Image (replaces path above)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleImageUpload('gallery', index, 'image', e)}
                  className="file-input"
                />
                {item.image_upload && (
                  <img src={item.image_upload} alt="Preview" className="image-preview" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderWorkshopsEditor = () => {
    if (!data.workshops) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Workshops</h3>
          <button 
            className="btn-add"
            onClick={() => addArrayItem('workshops', {
              id: `workshop-${Date.now()}`,
              title: 'New Workshop',
              description: 'Workshop description',
              icon: 'fas fa-chalkboard',
              featured: true
            })}
          >
            + Add Workshop
          </button>
        </div>
        
        {data.workshops.map((workshop, index) => (
          <div key={index} className="editor-card">
            <div className="card-header">
              <h4>{workshop.title}</h4>
              <button 
                className="btn-delete"
                onClick={() => deleteArrayItem('workshops', index)}
              >
                Delete
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>ID</label>
                <input 
                  type="text" 
                  value={workshop.id}
                  onChange={(e) => updateArrayItem('workshops', index, 'id', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Title</label>
                <input 
                  type="text" 
                  value={workshop.title}
                  onChange={(e) => updateArrayItem('workshops', index, 'title', e.target.value)}
                />
              </div>
              <div className="form-field full-width">
                <label>Description</label>
                <textarea 
                  value={workshop.description}
                  onChange={(e) => updateArrayItem('workshops', index, 'description', e.target.value)}
                  rows="2"
                />
              </div>
              <div className="form-field">
                <label>Icon (FontAwesome class)</label>
                <input 
                  type="text" 
                  value={workshop.icon}
                  onChange={(e) => updateArrayItem('workshops', index, 'icon', e.target.value)}
                  placeholder="fas fa-microchip"
                />
              </div>
              <div className="form-field">
                <label>Featured</label>
                <select 
                  value={workshop.featured}
                  onChange={(e) => updateArrayItem('workshops', index, 'featured', e.target.value === 'true')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderMembersEditor = () => {
    if (!data.teamMembers || !data.teamMembers.batches) return null
    
    return (
      <div className="editor-section">
        <div className="section-header-admin">
          <h3>Team Members</h3>
          <button 
            className="btn-add"
            onClick={() => {
              const newData = JSON.parse(JSON.stringify(data))
              newData.teamMembers.batches.push({
                year: String(new Date().getFullYear()),
                name: `Batch ${new Date().getFullYear()}`,
                icon: 'fas fa-users',
                description: 'New batch description',
                members: []
              })
              setData(newData)
            }}
          >
            + Add Batch
          </button>
        </div>
        
        {data.teamMembers.batches.map((batch, batchIndex) => (
          <div key={batchIndex} className="editor-card">
            <div className="card-header">
              <h4>Batch {batch.year}</h4>
              <button 
                className="btn-delete"
                onClick={() => {
                  const newData = JSON.parse(JSON.stringify(data))
                  newData.teamMembers.batches.splice(batchIndex, 1)
                  setData(newData)
                }}
              >
                Delete Batch
              </button>
            </div>
            <div className="form-grid">
              <div className="form-field">
                <label>Year</label>
                <input 
                  type="text" 
                  value={batch.year}
                  onChange={(e) => {
                    const newData = JSON.parse(JSON.stringify(data))
                    newData.teamMembers.batches[batchIndex].year = e.target.value
                    setData(newData)
                  }}
                />
              </div>
              <div className="form-field">
                <label>Batch Name</label>
                <input 
                  type="text" 
                  value={batch.name}
                  onChange={(e) => {
                    const newData = JSON.parse(JSON.stringify(data))
                    newData.teamMembers.batches[batchIndex].name = e.target.value
                    setData(newData)
                  }}
                />
              </div>
              <div className="form-field">
                <label>Icon (FontAwesome class)</label>
                <input 
                  type="text" 
                  value={batch.icon}
                  onChange={(e) => {
                    const newData = JSON.parse(JSON.stringify(data))
                    newData.teamMembers.batches[batchIndex].icon = e.target.value
                    setData(newData)
                  }}
                  placeholder="fas fa-rocket"
                />
              </div>
              <div className="form-field">
                <label>Description</label>
                <input 
                  type="text" 
                  value={batch.description || ''}
                  onChange={(e) => {
                    const newData = JSON.parse(JSON.stringify(data))
                    newData.teamMembers.batches[batchIndex].description = e.target.value
                    setData(newData)
                  }}
                />
              </div>
            </div>

            <div className="members-subsection">
              <div className="subsection-header">
                <h5>Members</h5>
                <button 
                  className="btn-add-small"
                  onClick={() => {
                    const newData = JSON.parse(JSON.stringify(data))
                    newData.teamMembers.batches[batchIndex].members.push({
                      id: Date.now(),
                      name: 'New Member',
                      photo: './assets/images/members/placeholder.jpg'
                    })
                    setData(newData)
                  }}
                >
                  + Add Member
                </button>
              </div>

              {batch.members.map((member, memberIndex) => (
                <div key={memberIndex} className="member-mini-card">
                  <button 
                    className="btn-delete-small"
                    onClick={() => {
                      const newData = JSON.parse(JSON.stringify(data))
                      newData.teamMembers.batches[batchIndex].members.splice(memberIndex, 1)
                      setData(newData)
                    }}
                  >
                    ×
                  </button>
                  <div className="member-form-grid">
                    <div className="form-field-small">
                      <label>Name</label>
                      <input 
                        type="text" 
                        value={member.name}
                        onChange={(e) => {
                          const newData = JSON.parse(JSON.stringify(data))
                          newData.teamMembers.batches[batchIndex].members[memberIndex].name = e.target.value
                          setData(newData)
                        }}
                      />
                    </div>
                    <div className="form-field-small">
                      <label>Photo Path</label>
                      <input 
                        type="text" 
                        value={member.photo}
                        onChange={(e) => {
                          const newData = JSON.parse(JSON.stringify(data))
                          newData.teamMembers.batches[batchIndex].members[memberIndex].photo = e.target.value
                          setData(newData)
                        }}
                      />
                    </div>
                    <div className="form-field-small full-width-small">
                      <label>Upload Photo (replaces path above)</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const newData = JSON.parse(JSON.stringify(data))
                              newData.teamMembers.batches[batchIndex].members[memberIndex].photo_upload = event.target.result
                              newData.teamMembers.batches[batchIndex].members[memberIndex].photo = `uploaded_${file.name}`
                              setData(newData)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="file-input"
                      />
                      {member.photo_upload && (
                        <img src={member.photo_upload} alt="Preview" className="image-preview-small" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Panel</h1>
          <div className="admin-actions">
            {saveStatus && <span className="save-status">{saveStatus}</span>}
            <button className="btn-save" onClick={handleSave}>
              <i className="fas fa-download"></i> Download {activeTab}.json
            </button>
            <Link to="/" className="btn-back">
              <i className="fas fa-arrow-left"></i> Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-sidebar">
          <div className="sidebar-menu">
            <button 
              className={`sidebar-item ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              <i className="fas fa-star"></i> Featured
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <i className="fas fa-calendar"></i> Events
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'workshops' ? 'active' : ''}`}
              onClick={() => setActiveTab('workshops')}
            >
              <i className="fas fa-chalkboard-teacher"></i> Workshops
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              <i className="fas fa-images"></i> Gallery
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              <i className="fas fa-users"></i> Team Members
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell"></i> Notifications
            </button>
            <button 
              className={`sidebar-item ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <i className="fas fa-info-circle"></i> About
            </button>
          </div>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'featured' && renderFeaturedEditor()}
              {activeTab === 'events' && renderEventsEditor()}
              {activeTab === 'notifications' && renderNotificationsEditor()}
              {activeTab === 'gallery' && renderGalleryEditor()}
              {activeTab === 'workshops' && renderWorkshopsEditor()}
              {activeTab === 'members' && renderMembersEditor()}
              {activeTab === 'about' && (
                <div className="editor-section">
                  <h3>About Content Editor</h3>
                  <p className="info-text">Edit the JSON directly below:</p>
                  <textarea 
                    className="json-editor"
                    value={JSON.stringify(data, null, 2)}
                    onChange={(e) => {
                      try {
                        setData(JSON.parse(e.target.value))
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }}
                    rows="20"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
