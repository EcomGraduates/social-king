

<Card>
      <OptionList
        title="Manage sales channels availability"
        onChange={setSelected}
        options={[
          {value: 'online_store', label: 'Online Store'},
          {value: 'messenger', label: 'Messenger'},
          {value: 'facebook', label: 'Facebook'},
          {value: 'wholesale', label: 'Wholesale'},
          {value: 'buzzfeed', label: 'BuzzFeed'},
        ]}
        selected={checkedTag}
        allowMultiple
      />
    </Card>