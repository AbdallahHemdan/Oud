const findByTestAttr = (component, val) => {
    return component.find(`[data-testid="${val}"]`);
}

export { findByTestAttr }