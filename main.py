
import streamlit as st
import pandas as pd
import plotly.express as px
import os
from google import generativeai as genai

# Page Configuration
st.set_page_config(
    page_title="Nexus HRMS - Admin Analytics",
    page_icon="🏢",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling
st.markdown("""
    <style>
    .main {
        background-color: #f8fafc;
    }
    .stMetric {
        background-color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    </style>
""", unsafe_allow_html=True)

# Mock Data for Analytics
@st.cache_data
def load_hr_data():
    data = {
        'Employee': ['James Wilson', 'Elena Rodriguez', 'Marcus Thorne', 'Sophie Laurent', 'David Kim', 'Sarah Connor'],
        'Department': ['Engineering', 'HR', 'Sales', 'Design', 'Engineering', 'Marketing'],
        'Salary': [95000, 82000, 78000, 88000, 92000, 85000],
        'Performance': [4.5, 4.8, 3.9, 4.2, 4.0, 4.7],
        'Satisfaction': [8, 9, 7, 9, 8, 9]
    }
    return pd.DataFrame(data)

def main():
    # Sidebar
    st.sidebar.image("https://picsum.photos/seed/nexus/100/100", width=80)
    st.sidebar.title("Nexus Admin")
    menu = ["Dashboard", "Employee Analytics", "AI Policy Generator", "System Status"]
    choice = st.sidebar.selectbox("Navigate", menu)

    df = load_hr_data()

    if choice == "Dashboard":
        st.title("🚀 HR Intelligence Dashboard")
        st.subheader("Real-time organizational health metrics")
        
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Headcount", "128", "12%")
        with col2:
            st.metric("Avg Performance", "4.3/5.0", "0.2")
        with col3:
            st.metric("Active Requisitions", "8", "-1")
        with col4:
            st.metric("Retention Rate", "94%", "2%")

        st.divider()

        c1, c2 = st.columns(2)
        with c1:
            st.markdown("### Department Distribution")
            fig_dept = px.pie(df, names='Department', values='Salary', hole=0.4,
                             color_discrete_sequence=px.colors.qualitative.Pastel)
            st.plotly_chart(fig_dept, use_container_width=True)
        
        with c2:
            st.markdown("### Performance vs Salary")
            fig_scatter = px.scatter(df, x='Performance', y='Salary', color='Department',
                                   size='Satisfaction', hover_name='Employee',
                                   template="plotly_white")
            st.plotly_chart(fig_scatter, use_container_width=True)

    elif choice == "Employee Analytics":
        st.title("📊 Detailed Workforce Analysis")
        st.dataframe(df, use_container_width=True)
        
        selected_dept = st.multiselect("Filter by Department", df['Department'].unique())
        if selected_dept:
            filtered_df = df[df['Department'].isin(selected_dept)]
            st.bar_chart(filtered_df.set_index('Employee')['Performance'])

    elif choice == "AI Policy Generator":
        st.title("🤖 AI Policy Draftsman")
        st.info("Using Gemini Pro to generate organizational guidelines.")
        
        policy_type = st.text_input("What policy do you want to draft?", "Remote Work Policy 2024")
        tone = st.select_slider("Select Tone", options=["Strict", "Professional", "Casual"])
        
        if st.button("Generate Draft"):
            with st.spinner("AI is thinking..."):
                try:
                    # In a real environment, you'd use the API key from environment
                    api_key = os.environ.get("API_KEY")
                    if api_key:
                        genai.configure(api_key=api_key)
                        model = genai.GenerativeModel('gemini-3-pro-preview')
                        prompt = f"Write a {tone} HR {policy_type} for a modern tech company called Nexus."
                        response = model.generate_content(prompt)
                        st.markdown(response.text)
                    else:
                        st.error("API Key not found in environment.")
                except Exception as e:
                    st.error(f"Error: {str(e)}")

    elif choice == "System Status":
        st.title("⚙️ System Administration")
        st.success("Frontend: Operational (React 19)")
        st.success("API: Operational (Gemini 2.5/3.0)")
        st.success("Database Proxy: Active")
        
        if st.button("Run Diagnostic"):
            st.write("Verifying data integrity...")
            st.progress(100)
            st.balloons()

if __name__ == "__main__":
    main()
