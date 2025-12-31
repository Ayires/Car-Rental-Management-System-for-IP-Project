// React Component: Enhanced Promotional Banner
const PromoBanner = () => {
    const [visible, setVisible] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    const [status, setStatus] = React.useState('idle'); // 'idle', 'loading', 'success', 'error'
    const [dismissedPermanently, setDismissedPermanently] = React.useState(false);
    const [showCloseConfirm, setShowCloseConfirm] = React.useState(false);
    const [showSuccessDetails, setShowSuccessDetails] = React.useState(false);
    const [animationState, setAnimationState] = React.useState('enter'); // 'enter', 'exit', 'hidden'
    const emailInputRef = React.useRef(null);
    const autoDismissTimerRef = React.useRef(null);

    // Check localStorage for previous dismissal
    React.useEffect(() => {
        const savedState = localStorage.getItem('promoBannerDismissed');
        if (savedState === 'true') {
            setDismissedPermanently(true);
            setVisible(false);
        }
    }, []);

    // Auto-focus email input when banner appears
    React.useEffect(() => {
        if (visible && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [visible]);

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (autoDismissTimerRef.current) {
                clearTimeout(autoDismissTimerRef.current);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !validateEmail(email)) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // In production: await api.subscribeNewsletter(email);
            console.log('Subscribed email:', email);
            
            setStatus('success');
            setSubmitted(true);
            
            // Track conversion
            trackConversion('newsletter_signup', email);
            
            // Auto-dismiss after success
            autoDismissTimerRef.current = setTimeout(() => {
                handleDismiss();
            }, 4000);
        } catch (error) {
            setStatus('error');
            console.error('Subscription failed:', error);
        }
    };

    const handleDismiss = (permanent = false) => {
        setAnimationState('exit');
        
        setTimeout(() => {
            setVisible(false);
            setAnimationState('hidden');
            
            if (permanent) {
                setDismissedPermanently(true);
                localStorage.setItem('promoBannerDismissed', 'true');
                trackEvent('banner_dismissed_permanently');
            } else {
                trackEvent('banner_dismissed_temporarily');
            }
        }, 300);
    };

    const handleCloseClick = () => {
        if (!submitted) {
            setShowCloseConfirm(true);
        } else {
            handleDismiss();
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const trackConversion = (event, email) => {
        // Integration with analytics (GA, Mixpanel, etc.)
        if (window.gtag) {
            window.gtag('event', 'conversion', {
                'send_to': 'AW-123456789/AbC-D_efG-h12',
                'value': 1.0,
                'currency': 'USD',
                'transaction_id': '',
                'email': email
            });
        }
        // Add other analytics providers as needed
    };

    const trackEvent = (action) => {
        if (window.gtag) {
            window.gtag('event', action, {
                'event_category': 'promo_banner',
                'event_label': 'special_offer'
            });
        }
    };

    const getDiscountCode = () => {
        // Generate or fetch discount code
        const code = 'SAVE15-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        return code;
    };

    if (!visible || dismissedPermanently) return null;

    return (
        <div className={`promo-banner-wrapper ${animationState}`}>
            <div className="card bg-gradient-primary text-white shadow-lg border-0 promo-card">
                <div className="card-body d-flex align-items-center justify-content-between flex-wrap p-4">
                    <div className="flex-grow-1 me-4">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-gift fa-lg me-3 text-warning"></i>
                            <div>
                                <h5 className="card-title mb-1 fw-bold">
                                    Limited Time Offer! 🎁
                                </h5>
                                <p className="card-text mb-0 text-white-80">
                                    Subscribe now & get <span className="fw-bold">15% OFF</span> + early access to deals
                                </p>
                            </div>
                        </div>
                        
                        {showSuccessDetails && (
                            <div className="mt-3 p-3 bg-white-10 rounded">
                                <p className="card-text">Special weekend rates starting at <span className="fw-bold fs-4 text-warning">Br29.99</span>/day!</p>
                                <p className="mb-2">
                                    <i className="fas fa-check-circle text-success me-2"></i>
                                    Your discount code: <code className="bg-dark text-warning px-2 py-1 rounded">{getDiscountCode()}</code>
                                </p>
                                <small className="text-white-60">
                                    Code will be sent to {email}. Valid for 30 days.
                                </small>
                            </div>
                        )}
                    </div>

                    {submitted ? (
                        <div className="d-flex align-items-center gap-3">
                            <div className="alert alert-success mb-0 py-2 px-3 d-flex align-items-center">
                                <i className="fas fa-check-circle me-2"></i>
                                <div>
                                    <strong>Subscribed Successfully!</strong>
                                    <div className="d-flex gap-2 mt-1">
                                        <button 
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => setShowSuccessDetails(!showSuccessDetails)}
                                        >
                                            {showSuccessDetails ? 'Hide Details' : 'Show Code'}
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleDismiss()}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                            <form onSubmit={handleSubmit} className="d-flex gap-2 align-items-center">
                                <div className="position-relative">
                                    <input
                                        ref={emailInputRef}
                                        type="email"
                                        className={`form-control ${status === 'error' ? 'is-invalid' : ''}`}
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        required
                                        style={{ minWidth: '280px', paddingRight: '40px' }}
                                        disabled={status === 'loading'}
                                    />
                                    {email && validateEmail(email) && (
                                        <i className="fas fa-check text-success position-absolute"
                                           style={{ right: '12px', top: '50%', transform: 'translateY(-50%)' }}></i>
                                    )}
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-warning text-dark fw-bold px-4"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Subscribing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-paper-plane me-2"></i>
                                            Get 15% Off
                                        </>
                                    )}
                                </button>
                            </form>
                            
                            <button 
                                type="button" 
                                className="btn btn-outline-light btn-sm"
                                onClick={handleCloseClick}
                                aria-label="Close"
                                title="Close banner"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Progress bar for auto-dismiss */}
                {submitted && (
                    <div className="progress" style={{ height: '3px' }}>
                        <div 
                            className="progress-bar bg-success" 
                            role="progressbar"
                            style={{ 
                                width: '100%',
                                animation: 'countdown 4s linear forwards'
                            }}
                        ></div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showCloseConfirm && (
                <div className="modal-overlay" onClick={() => setShowCloseConfirm(false)}>
                    <div className="modal-dialog" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Don't Miss Out!</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCloseConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>This offer is only available for a limited time.</p>
                                <p>Are you sure you want to close this offer?</p>
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="dontShowAgain"
                                        onChange={(e) => setDismissedPermanently(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="dontShowAgain">
                                        Don't show this offer again
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={() => setShowCloseConfirm(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        handleDismiss(dismissedPermanently);
                                        setShowCloseConfirm(false);
                                    }}
                                >
                                    Close Offer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add CSS for animations and styles
const style = document.createElement('style');
style.textContent = `
    .promo-banner-wrapper {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .promo-banner-wrapper.enter {
        animation: slideDown 0.3s ease-out;
    }
    
    .promo-banner-wrapper.exit {
        transform: translateY(-100%);
        opacity: 0;
    }
    
    .promo-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
    }
    
    .bg-gradient-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .text-white-80 {
        color: rgba(255, 255, 255, 0.8);
    }
    
    .text-white-60 {
        color: rgba(255, 255, 255, 0.6);
    }
    
    .bg-white-10 {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1050;
    }
    
    .modal-dialog {
        max-width: 400px;
        width: 90%;
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes countdown {
        from { width: 100%; }
        to { width: 0%; }
    }
`;
document.head.appendChild(style);

// Mount the component with error boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return null; // Silently fail without breaking the main app
        }
        return this.props.children;
    }
}

const mountPromoBanner = () => {
    const rootElement = document.getElementById('react-promo-root');
    if (rootElement) {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <ErrorBoundary>
                <PromoBanner />
            </ErrorBoundary>
        );
    }
};

// Mount when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountPromoBanner);
} else {
    mountPromoBanner();
}

// Export for potential module usage
window.PromoBanner = PromoBanner;
