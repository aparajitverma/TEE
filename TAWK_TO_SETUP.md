# Tawk.to Live Chat Setup Guide

## Overview
Tawk.to is a free, lightweight live chat solution that provides:
- ✅ Always-floating widget in bottom right corner
- ✅ Minimal performance impact (~50KB)
- ✅ Mobile responsive
- ✅ Customizable appearance
- ✅ Business hours configuration
- ✅ Auto-responses and chatbots
- ✅ Multi-agent support
- ✅ Chat history and analytics

## Setup Instructions

### Step 1: Create Tawk.to Account
1. Go to [https://www.tawk.to](https://www.tawk.to)
2. Click "Sign Up Free"
3. Create your account with email and password
4. Verify your email address

### Step 2: Create a Property
1. After logging in, click "Add Property"
2. Enter your website details:
   - **Property Name**: The Export Express
   - **Website URL**: https://yourwebsite.com
3. Click "Create Property"

### Step 3: Get Your Widget Code
1. Go to **Administration** → **Channels** → **Chat Widget**
2. You'll see your unique widget code that looks like:
   ```html
   <!--Start of Tawk.to Script-->
   <script type="text/javascript">
   var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
   (function(){
   var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
   s1.async=true;
   s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
   s1.charset='UTF-8';
   s1.setAttribute('crossorigin','*');
   s0.parentNode.insertBefore(s1,s0);
   })();
   </script>
   <!--End of Tawk.to Script-->
   ```
3. Copy the **Property ID** and **Widget ID** from the URL

### Step 4: Update the Component
1. Open `src/components/TawkToChat.tsx`
2. Replace `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` with your actual IDs:
   ```typescript
   script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
   ```
   Example:
   ```typescript
   script.src = 'https://embed.tawk.to/507f1f77bcf86cd799439011/1h2j3k4l5m';
   ```

### Step 5: Configure Business Hours (9 AM - 6 PM IST)
1. In Tawk.to Dashboard, go to **Administration** → **Business Hours**
2. Set your timezone: **Asia/Kolkata (IST)**
3. Configure hours:
   - **Monday - Friday**: 09:00 AM - 06:00 PM
   - **Saturday**: 09:00 AM - 02:00 PM
   - **Sunday**: Closed
4. Enable "Show offline message when outside business hours"
5. Click "Save Changes"

### Step 6: Configure Auto-Responses
1. Go to **Administration** → **Shortcuts & Triggers**
2. Click "Add Trigger"
3. Create welcome message:
   - **Trigger Name**: Welcome Message
   - **Trigger Type**: Chat Started
   - **Message**: 
     ```
     Welcome to The Export Express! 👋
     
     We're here to help with your export needs. How can we assist you today?
     
     Our business hours:
     Mon-Fri: 9:00 AM - 6:00 PM IST
     Sat: 9:00 AM - 2:00 PM IST
     ```
4. Create offline message:
   - **Trigger Name**: Offline Message
   - **Trigger Type**: Outside Business Hours
   - **Message**:
     ```
     Thank you for contacting The Export Express! 🌙
     
     We're currently offline. Our business hours are:
     Mon-Fri: 9:00 AM - 6:00 PM IST
     Sat: 9:00 AM - 2:00 PM IST
     
     Please leave us a message and we'll get back to you as soon as possible!
     ```

### Step 7: Customize Widget Appearance
1. Go to **Administration** → **Chat Widget** → **Widget Appearance**
2. Customize colors to match your brand:
   - **Primary Color**: #10b981 (Green)
   - **Widget Position**: Bottom Right
   - **Widget Size**: Normal
3. Upload your logo (optional)
4. Set widget bubble text: "Need help? Chat with us!"
5. Click "Save Changes"

### Step 8: Set Up Agents
1. Go to **Administration** → **Agents**
2. Add team members:
   - Click "Add Agent"
   - Enter email addresses
   - Assign roles (Admin, Agent, etc.)
3. Configure agent availability

### Step 9: Enable Mobile App (Optional)
1. Download Tawk.to mobile app from:
   - [iOS App Store](https://apps.apple.com/app/tawk-to/id1037654839)
   - [Google Play Store](https://play.google.com/store/apps/details?id=to.tawk.app)
2. Log in with your account
3. Receive push notifications for new chats

## Advanced Features

### Chatbot Setup (Optional)
1. Go to **Administration** → **Automation** → **Chatbot**
2. Enable chatbot
3. Create automated responses for common questions:
   - Product inquiries
   - Pricing questions
   - Shipping information
   - MOQ questions

### Pre-Chat Form
1. Go to **Administration** → **Chat Widget** → **Pre-Chat Form**
2. Enable pre-chat form
3. Add fields:
   - Name (required)
   - Email (required)
   - Company
   - Product Interest
   - Message

### Visitor Monitoring
1. Go to **Dashboard** → **Monitoring**
2. See real-time visitors on your website
3. Proactively start conversations with visitors

### Chat History & Analytics
1. Go to **Dashboard** → **History**
2. View all past conversations
3. Export chat transcripts
4. Analyze response times and satisfaction

## Widget Features

### What Users Will See:
- ✅ Floating chat bubble in bottom right corner
- ✅ Green notification badge for new messages
- ✅ Smooth slide-in animation
- ✅ Minimizable chat window
- ✅ File sharing capability
- ✅ Emoji support
- ✅ Typing indicators
- ✅ Read receipts
- ✅ Sound notifications (optional)

### Mobile Experience:
- ✅ Fully responsive
- ✅ Touch-optimized
- ✅ Full-screen chat on mobile
- ✅ Native feel on iOS/Android

## Performance Impact

### Tawk.to is extremely lightweight:
- **Initial Load**: ~50KB (compressed)
- **Lazy Loading**: Widget loads after page content
- **No jQuery**: Pure JavaScript
- **CDN Delivery**: Fast global loading
- **Async Loading**: Doesn't block page rendering

### Performance Metrics:
- ✅ Lighthouse Score: 95+ (minimal impact)
- ✅ Page Load Time: +50-100ms
- ✅ First Contentful Paint: No impact
- ✅ Time to Interactive: No impact

## Testing

### Test the Widget:
1. Visit your website
2. Look for the chat bubble in bottom right
3. Click to open chat
4. Send a test message
5. Check Tawk.to dashboard for the message

### Test Business Hours:
1. Change your computer time to outside business hours
2. Refresh the website
3. Verify offline message appears

### Test Auto-Responses:
1. Start a new chat
2. Verify welcome message appears
3. Test different scenarios

## Troubleshooting

### Widget Not Appearing:
- ✅ Check Property ID and Widget ID are correct
- ✅ Clear browser cache
- ✅ Check browser console for errors
- ✅ Verify script is loading (Network tab)

### Widget Appearing Multiple Times:
- ✅ Ensure TawkToChat component is only in layout.tsx
- ✅ Check for duplicate script tags

### Chat Not Working:
- ✅ Verify Tawk.to account is active
- ✅ Check widget is enabled in dashboard
- ✅ Ensure agents are online

## Alternative Platforms (If Needed)

If you prefer other platforms, here are alternatives:

### 1. **Crisp** (Free tier available)
- Similar to Tawk.to
- Modern UI
- ~60KB size

### 2. **Tidio** (Free tier available)
- Good chatbot features
- ~70KB size

### 3. **Intercom** (Paid, premium)
- Enterprise features
- Heavier (~200KB)
- More expensive

### 4. **Zendesk Chat** (Paid)
- Full support suite
- ~150KB size

**Recommendation**: Stick with Tawk.to for the best balance of features, performance, and cost (free).

## Support

### Tawk.to Support:
- **Help Center**: https://help.tawk.to
- **Email**: support@tawk.to
- **Live Chat**: Available on tawk.to website

### Component Support:
- Component location: `src/components/TawkToChat.tsx`
- Layout integration: `src/app/layout.tsx`

---

**Status**: ✅ Component installed and ready
**Next Step**: Add your Property ID and Widget ID to activate the chat widget
