import { InlineWidget } from "react-calendly";

const Calendar = () => {
  return (
    <div>
      <div className="Calendly" style={{ height: "700px" }}>
        <InlineWidget url="https://calendly.com/pilar-macchiavello-latambioenergy/30min" 
        
        styles={{ height: "100%" }} 
        
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: '2c9645',
          textColor: '4d5055'
        }}/>
      </div>
    </div>
  );
};

export default Calendar;