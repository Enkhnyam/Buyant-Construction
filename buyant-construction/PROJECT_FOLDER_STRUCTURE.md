# Project Folder Structure Guide

## 📁 Current Organization

```
public/uploads/
├── 📁 project-1/                    # Residential Building
│   ├── 🖼️ main-view.svg            # Main project image
│   └── 🖼️ interior-view.svg        # Interior view
│
├── 📁 project-2/                    # Commercial Center  
│   ├── 🖼️ main-view.svg            # Main project image
│   └── 🖼️ exterior-view.svg        # Exterior view
│
├── 📁 project-3/                    # Renovation Project
│   └── 🖼️ main-view.svg            # Main project image
│
├── 📁 project-4/                    # Private House
│   ├── 🖼️ main-view.jpeg           # Main project image
│   └── 🖼️ side-view.jpeg           # Side view
│
├── 📁 project-5/                    # Office Building
│   ├── 🖼️ main-view.jpeg           # Main project image
│   ├── 🖼️ environment-view.jpeg    # Environment view
│   ├── 🖼️ side-view.jpeg           # Side view
│   ├── 🖼️ detail-view.jpeg         # Detail view
│   └── 🖼️ additional-view.jpeg     # Additional view
│
└── 📁 project-6/                    # Hostel Building
    ├── 🖼️ main-view.jpeg           # Main project image
    ├── 🖼️ side-view.jpeg           # Side view
    ├── 🖼️ detail-view.jpeg         # Detail view
    ├── 🖼️ additional-view.jpeg     # Additional view
    ├── 🖼️ interior-view.jpeg       # Interior view
    ├── 🖼️ exterior-view.jpeg       # Exterior view
    ├── 🖼️ closeup-view.jpeg        # Closeup view
    └── 🖼️ wide-view.jpeg           # Wide view
```

## 🆕 Adding New Projects

### Step 1: Create Project Folder
```bash
mkdir public/uploads/project-7
```

### Step 2: Add Images with Descriptive Names
```
project-7/
├── main-view.jpg      # Required: Main project image
├── interior-view.jpg  # Interior view
├── exterior-view.jpg  # Exterior view
├── side-view.jpg      # Side view
└── detail-view.jpg    # Detail view
```

### Step 3: Update projects.ts
```typescript
{
  id: 'project-7',
  // ... other project details
  images: [
    {
      url: '/uploads/project-7/main-view.jpg',
      isPrimary: true,
      order: 1
    },
    {
      url: '/uploads/project-7/interior-view.jpg',
      isPrimary: false,
      order: 2
    }
  ]
}
```

## 📋 Image Naming Convention

| Image Type | Filename | Description |
|------------|----------|-------------|
| **Main View** | `main-view.jpg` | **Required** - Main project image |
| Side View | `side-view.jpg` | Side angle of the project |
| Interior | `interior-view.jpg` | Inside view |
| Exterior | `exterior-view.jpg` | Outside view |
| Detail | `detail-view.jpg` | Close-up details |
| Environment | `environment-view.jpg` | Surrounding area |
| Additional | `additional-view.jpg` | Extra angles |
| Closeup | `closeup-view.jpg` | Very close details |
| Wide | `wide-view.jpg` | Wide angle shot |

## 🎯 Benefits

✅ **Organized** - Each project has its own folder  
✅ **Clear** - Descriptive image names  
✅ **Scalable** - Easy to add more projects  
✅ **Professional** - Clean structure for clients  
✅ **Maintainable** - Easy to find and edit images  

## 🔧 Quick Commands

```bash
# Create new project folder
mkdir public/uploads/project-7

# Move images to project folder
mv image1.jpg public/uploads/project-7/main-view.jpg
mv image2.jpg public/uploads/project-7/interior-view.jpg

# View project structure
ls -la public/uploads/project-7/
```
